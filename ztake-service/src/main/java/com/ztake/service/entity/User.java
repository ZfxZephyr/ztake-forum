package com.ztake.service.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("user")
public class User {
    @TableId(type = IdType.INPUT)
    private String id;

    private String name;
    private String email;
    private String password;
    private String avatarColor;
    private String bio;
    private Integer level;
    private LocalDateTime createdAt;
}
