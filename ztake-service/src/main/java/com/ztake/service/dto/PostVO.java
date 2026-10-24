package com.ztake.service.dto;

import lombok.Data;

import java.util.List;

/** 帖子视图对象：content 拆分为段落数组、tags 拆分为数组 */
@Data
public class PostVO {
    private String id;
    private String author;
    private String avatarColor;
    private String board;
    private Boolean pinned;
    private String title;
    private String excerpt;
    private List<String> content;
    private List<String> tags;
    private Integer likes;
    private Integer favorites;
    private Integer views;
    private String createdAt;
}
