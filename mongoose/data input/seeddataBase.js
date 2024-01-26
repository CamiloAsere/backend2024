import main from "../router/services/main.js";
import createAuthors from "./createA.js";
import createQuestions from "./createQ.js";

export class DatabaseSeeder {
    async seedAuthors() {
      // Lógica para agregar autores a la base de datos
      createAuthors();
    }
  
    async seedQuestions() {
      // Lógica para agregar preguntas a la base de datos
      createQuestions();
    }
    async seedUsers() {
    //
    }
    async seedDataPlan() {
    //
    main()
    }
    async seedDatabase() {
      await this.seedAuthors();
      await this.seedQuestions();
      await this.seedUsers();
      await this.seedDataPlan();
    }
  }
  