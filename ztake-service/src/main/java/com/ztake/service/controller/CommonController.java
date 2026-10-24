package com.ztake.service.controller;

import com.ztake.service.common.Result;
import com.ztake.service.dto.PostVO;
import com.ztake.service.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommonController {

    private final ForumService forumService;

    @GetMapping("/health")
    public Result<Map<String, Object>> health() {
        return Result.ok(Map.of("status", "up", "service", "ztake-service"));
    }

    @GetMapping("/search")
    public Result<List<PostVO>> search(@RequestParam(required = false) String q) {
        return Result.ok(forumService.search(q));
    }

    @GetMapping("/stats")
    public Result<Map<String, Object>> stats() {
        return Result.ok(forumService.stats());
    }
}
