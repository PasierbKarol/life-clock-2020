package com.computator.lifecloack

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LifeCloackServerApplication

fun main(args: Array<String>) {
  runApplication<LifeCloackServerApplication>(*args)
}
