package io.github.hackaton2018.jhipster.application.cucumber.stepdefs;

import io.github.hackaton2018.jhipster.application.TaskExchangeApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = TaskExchangeApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
