package de.reutlingenuniversity.vs_frontend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class VsFrontendApplication {

	public static void main(String[] args) {
		SpringApplication.run(VsFrontendApplication.class, args);
	}

}
