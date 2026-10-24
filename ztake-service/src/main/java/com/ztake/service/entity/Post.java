package com.ztake.service.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("post")
public class Post {
    @TableId(type = IdType.INPUT)
    private String id;

    private String author;
    private String avatarColor;
    private String board;
    private Boolean pinned;
    private String title;
    private String excerpt;
    /** 原文以 \n\n 分段存储 */
    private String content;
    /** 逗号分隔 */
    private String tags;

    private Integer likes;
    private Integer favorites;
    private Integer views;
    private LocalDateTime createdAt;
}
