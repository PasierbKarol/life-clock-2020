package com.computator.lifeclock

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LifeClockServerApplication

fun main(args: Array<String>) {
  runApplication<LifeClockServerApplication>(*args)
}
