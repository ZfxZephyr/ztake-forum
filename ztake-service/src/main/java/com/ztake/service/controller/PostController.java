package com.ztake.service.controller;

import com.ztake.service.common.Result;
import com.ztake.service.dto.CommentRequest;
import com.ztake.service.dto.PostRequest;
import com.ztake.service.dto.PostVO;
import com.ztake.service.service.ForumService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final ForumService forumService;

    @GetMapping
    public Result<List<PostVO>> list(@RequestParam(required = false) String board) {
        return Result.ok(forumService.listPosts(board));
    }

    @GetMapping("/hot")
    public Result<List<Map<String, Object>>> hot() {
        return Result.ok(forumService.hotList());
    }

    @GetMapping("/{id}")
    public Result<Map<String, Object>> detail(@PathVariable String id) {
        return Result.ok(forumService.getPostDetail(id));
    }

    @PostMapping
    public Result<PostVO> create(@Valid @RequestBody PostRequest req) {
        return Result.ok(forumService.createPost(req));
    }

    @PostMapping("/{id}/like")
    public Result<PostVO> like(@PathVariable String id) {
        return Result.ok(forumService.likePost(id));
    }

    @GetMapping("/{id}/comments")
    public Result<List<?>> comments(@PathVariable String id) {
        return Result.ok(forumService.listComments(id));
    }

    @PostMapping("/{id}/comments")
    public Result<?> createComment(@PathVariable String id, @Valid @RequestBody CommentRequest req) {
        return Result.ok(forumService.createComment(id, req));
    }
}
