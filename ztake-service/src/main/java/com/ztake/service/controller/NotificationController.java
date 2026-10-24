package com.ztake.service.controller;

import com.ztake.service.common.Result;
import com.ztake.service.entity.Notification;
import com.ztake.service.service.ForumService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final ForumService forumService;

    @GetMapping
    public Result<List<Notification>> list() {
        return Result.ok(forumService.listNotifications());
    }

    @PostMapping("/read-all")
    public Result<List<Notification>> readAll() {
        return Result.ok(forumService.readAllNotifications());
    }
}
