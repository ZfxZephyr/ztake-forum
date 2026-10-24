package com.ztake.service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CommentRequest {
    @NotBlank(message = "评论内容不能为空")
    private String content;
    /** 楼中楼回复的父评论 id，可为空 */
    private String parentId;
}
