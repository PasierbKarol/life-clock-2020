package com.computator.lifeclock

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication


@SpringBootApplication
@EnableConfigurationProperties(EmailConfiguration::class)
@ConfigurationPropertiesScan
class LifeClockServerApplication

fun main(args: Array<String>) {
  runApplication<LifeClockServerApplication>(*args)
}
