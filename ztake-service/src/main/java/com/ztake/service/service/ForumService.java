package com.ztake.service.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.ztake.service.common.BizException;
import com.ztake.service.dto.*;
import com.ztake.service.entity.*;
import com.ztake.service.mapper.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ForumService {

    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final PostMapper postMapper;
    private final CommentMapper commentMapper;
    private final UserMapper userMapper;
    private final NotificationMapper notificationMapper;

    /* ---------- 帖子 ---------- */

    public List<PostVO> listPosts(String board) {
        LambdaQueryWrapper<Post> qw = new LambdaQueryWrapper<Post>()
                .eq(StringUtils.isNotBlank(board) && !"all".equals(board), Post::getBoard, board)
                .orderByDesc(Post::getPinned)
                .orderByDesc(Post::getCreatedAt);
        return postMapper.selectList(qw).stream().map(this::toVO).collect(Collectors.toList());
    }

    /** 详情 = 帖子字段 + 楼中楼评论树（content 拆分为段落数组） */
    public Map<String, Object> getPostDetail(String id) {
        Post post = postMapper.selectById(id);
        if (post == null) throw new BizException(404, "帖子不存在");
        post.setViews(post.getViews() + 1);
        postMapper.updateById(post);

        PostVO vo = toVO(post);
        vo.setContent(splitContent(post.getContent()));

        Map<String, Object> detail = new LinkedHashMap<>();
        detail.put("id", vo.getId());
        detail.put("author", vo.getAuthor());
        detail.put("avatarColor", vo.getAvatarColor());
        detail.put("board", vo.getBoard());
        detail.put("pinned", vo.getPinned());
        detail.put("title", vo.getTitle());
        detail.put("excerpt", vo.getExcerpt());
        detail.put("content", vo.getContent());
        detail.put("tags", vo.getTags());
        detail.put("likes", vo.getLikes());
        detail.put("favorites", vo.getFavorites());
        detail.put("views", vo.getViews());
        detail.put("createdAt", vo.getCreatedAt());
        detail.put("comments", listComments(id));
        return detail;
    }

    public PostVO createPost(PostRequest req) {
        Post post = new Post();
        post.setId(UUID.randomUUID().toString().replace("-", "").substring(0, 16));
        post.setAuthor("飞翔");
        post.setAvatarColor("#6a9bcc");
        post.setBoard(StringUtils.defaultIfBlank(req.getBoard(), "dev"));
        post.setPinned(false);
        post.setTitle(req.getTitle());
        post.setExcerpt(StringUtils.abbreviate(req.getContent(), 80) + "…");
        post.setContent(req.getContent());
        post.setTags(CollectionUtils.isEmpty(req.getTags()) ? "" : String.join(",", req.getTags()));
        post.setLikes(0);
        post.setFavorites(0);
        post.setViews(0);
        postMapper.insert(post);
        PostVO vo = toVO(post);
        vo.setContent(splitContent(post.getContent()));
        return vo;
    }

    public PostVO likePost(String id) {
        Post post = postMapper.selectById(id);
        if (post == null) throw new BizException(404, "帖子不存在");
        post.setLikes(post.getLikes() + 1);
        postMapper.updateById(post);
        return toVO(post);
    }

    /* ---------- 评论 ---------- */

    public List<CommentVO> listComments(String postId) {
        List<Comment> all = commentMapper.selectList(
                new LambdaQueryWrapper<Comment>().eq(Comment::getPostId, postId).orderByAsc(Comment::getCreatedAt));
        Map<String, List<Comment>> byParent = all.stream()
                .filter(c -> c.getParentId() != null)
                .collect(Collectors.groupingBy(Comment::getParentId));
        return all.stream()
                .filter(c -> c.getParentId() == null)
                .map(c -> toCommentVO(c, byParent.get(c.getId())))
                .collect(Collectors.toList());
    }

    public CommentVO createComment(String postId, CommentRequest req) {
        Post post = postMapper.selectById(postId);
        if (post == null) throw new BizException(404, "帖子不存在");
        Comment c = new Comment();
        c.setId(UUID.randomUUID().toString().replace("-", "").substring(0, 16));
        c.setPostId(postId);
        c.setParentId(req.getParentId());
        c.setAuthor("飞翔");
        c.setAvatarColor("#6a9bcc");
        c.setContent(req.getContent());
        c.setLikes(0);
        commentMapper.insert(c);
        return toCommentVO(c, null);
    }

    /* ---------- 认证 ---------- */

    public Map<String, Object> login(LoginRequest req) {
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getEmail, req.getEmail()));
        if (user == null || !user.getPassword().equals(req.getPassword())) {
            throw new BizException(401, "邮箱或密码错误");
        }
        // TODO: 替换为 JWT 签发 + BCrypt 密码校验（spring-security-crypto）
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("id", user.getId());
        result.put("name", user.getName());
        result.put("email", user.getEmail());
        result.put("avatarColor", user.getAvatarColor());
        result.put("bio", user.getBio());
        result.put("level", user.getLevel());
        result.put("token", "jwt-" + UUID.randomUUID());
        return result;
    }

    public Map<String, Object> register(String email, String name) {
        Long count = userMapper.selectCount(new LambdaQueryWrapper<User>().eq(User::getEmail, email));
        if (count > 0) throw new BizException(409, "该邮箱已被注册");
        User user = new User();
        user.setId(UUID.randomUUID().toString().replace("-", "").substring(0, 16));
        user.setName(StringUtils.defaultIfBlank(name, email.split("@")[0]));
        user.setEmail(email);
        user.setPassword("123456"); // TODO: BCrypt 哈希
        user.setAvatarColor("#6a9bcc");
        user.setLevel(1);
        userMapper.insert(user);
        return Map.of("email", email, "message", "注册成功，请查收验证邮件");
    }

    /* ---------- 通知 ---------- */

    public List<Notification> listNotifications() {
        return notificationMapper.selectList(
                new LambdaQueryWrapper<Notification>().orderByDesc(Notification::getCreatedAt));
    }

    public List<Notification> readAllNotifications() {
        List<Notification> list = listNotifications();
        list.forEach(n -> {
            if (Boolean.TRUE.equals(n.getUnread())) {
                n.setUnread(false);
                notificationMapper.updateById(n);
            }
        });
        return list;
    }

    /* ---------- 其他 ---------- */

    public List<Map<String, Object>> hotList() {
        return postMapper.selectList(new LambdaQueryWrapper<Post>().orderByDesc(Post::getLikes).last("LIMIT 5"))
                .stream()
                .map(p -> {
                    Long comments = commentMapper.selectCount(
                            new LambdaQueryWrapper<Comment>().eq(Comment::getPostId, p.getId()));
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", p.getId());
                    m.put("title", p.getTitle());
                    m.put("meta", p.getLikes() + " 赞 · " + comments + " 评论");
                    return m;
                }).collect(Collectors.toList());
    }

    public List<PostVO> search(String q) {
        if (StringUtils.isBlank(q)) return List.of();
        return postMapper.selectList(new LambdaQueryWrapper<Post>()
                        .like(Post::getTitle, q).or().like(Post::getExcerpt, q).or().like(Post::getTags, q))
                .stream().map(this::toVO).collect(Collectors.toList());
    }

    public Map<String, Object> stats() {
        Map<String, Object> s = new LinkedHashMap<>();
        s.put("members", userMapper.selectCount(null) * 412 + "k"); // 演示用换算
        s.put("todayPosts", postMapper.selectCount(null) * 40);
        s.put("weeklyTopics", postMapper.selectCount(null));
        s.put("replyRate", "98%");
        return s;
    }

    /* ---------- 私有工具 ---------- */

    private PostVO toVO(Post p) {
        PostVO vo = new PostVO();
        vo.setId(p.getId());
        vo.setAuthor(p.getAuthor());
        vo.setAvatarColor(p.getAvatarColor());
        vo.setBoard(p.getBoard());
        vo.setPinned(p.getPinned());
        vo.setTitle(p.getTitle());
        vo.setExcerpt(p.getExcerpt());
        vo.setTags(StringUtils.isBlank(p.getTags()) ? List.of() : List.of(p.getTags().split(",")));
        vo.setLikes(p.getLikes());
        vo.setFavorites(p.getFavorites());
        vo.setViews(p.getViews());
        vo.setCreatedAt(p.getCreatedAt() == null ? null : p.getCreatedAt().format(FMT));
        return vo;
    }

    private List<String> splitContent(String content) {
        return StringUtils.isBlank(content) ? List.of() : List.of(content.split("\n\n"));
    }

    private CommentVO toCommentVO(Comment c, List<Comment> replies) {
        CommentVO vo = new CommentVO();
        vo.setId(c.getId());
        vo.setAuthor(c.getAuthor());
        vo.setAvatarColor(c.getAvatarColor());
        vo.setContent(c.getContent());
        vo.setLikes(c.getLikes());
        vo.setCreatedAt(c.getCreatedAt() == null ? null : c.getCreatedAt().format(FMT));
        vo.setReplies(CollectionUtils.isEmpty(replies) ? List.of()
                : replies.stream().map(r -> toCommentVO(r, null)).collect(Collectors.toList()));
        return vo;
    }
}
