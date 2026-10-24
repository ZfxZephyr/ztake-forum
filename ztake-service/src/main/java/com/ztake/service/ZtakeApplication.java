package com.ztake.service;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.ztake.service.mapper")
public class ZtakeApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZtakeApplication.class, args);
    }
}
