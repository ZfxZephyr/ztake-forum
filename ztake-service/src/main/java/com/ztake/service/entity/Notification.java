package com.ztake.service.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("notification")
public class Notification {
    @TableId(type = IdType.INPUT)
    private String id;

    private String type;
    private String actor;
    private String avatarColor;
    private String text;
    private String postId;
    private Boolean unread;
    private LocalDateTime createdAt;
}
