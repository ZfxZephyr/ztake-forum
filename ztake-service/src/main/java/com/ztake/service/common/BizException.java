package com.ztake.service.common;

import lombok.Getter;

/** 业务异常：由全局异常处理器转换为统一响应 */
@Getter
public class BizException extends RuntimeException {
    private final int status;

    public BizException(int status, String message) {
        super(message);
        this.status = status;
    }
}
