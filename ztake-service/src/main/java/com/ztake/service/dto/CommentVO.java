package com.ztake.service.dto;

import lombok.Data;

import java.util.List;

/** 评论视图对象：带楼中楼回复 */
@Data
public class CommentVO {
    private String id;
    private String author;
    private String avatarColor;
    private String content;
    private Integer likes;
    private String createdAt;
    private List<CommentVO> replies;
}
