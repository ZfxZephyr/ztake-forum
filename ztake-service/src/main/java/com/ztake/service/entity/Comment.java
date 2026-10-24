package com.ztake.service.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("comment")
public class Comment {
    @TableId(type = IdType.INPUT)
    private String id;

    private String postId;
    private String parentId;
    private String author;
    private String avatarColor;
    private String content;
    private Integer likes;
    private LocalDateTime createdAt;
}
