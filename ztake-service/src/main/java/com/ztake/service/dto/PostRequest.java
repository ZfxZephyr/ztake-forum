package com.ztake.service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class PostRequest {
    @NotBlank(message = "标题不能为空")
    @Size(max = 120, message = "标题最长 120 字")
    private String title;

    @NotBlank(message = "正文不能为空")
    private String content;

    private String board = "dev";
    private List<String> tags;
}
