interface Documento {
    mostrar(): void;
  }
  
  // Interfaz para las fábricas
  interface FabricaDocumentos {
    crearDocumento(tipo: string, contenido: string): Documento;
  }
  
  // Producto concreto 1: DocumentoTexto
  class DocumentoTexto implements Documento {
    private texto: string;
  
    constructor(texto: string) {
      this.texto = texto;
    }
  
    mostrar() {
      console.log("Documento de texto: " + this.texto);
    }
  }
  
  // Producto concreto 2: DocumentoImagen
  class DocumentoImagen implements Documento {
    private imagen: string;
  
    constructor(imagen: string) {
      this.imagen = imagen;
    }
  
    mostrar() {
      console.log("Documento de imagen: " + this.imagen);
    }
  }
  
  // Fábrica concreta: FabricaDocumentosSimple
  class FabricaDocumentosSimple implements FabricaDocumentos {
    crearDocumento(tipo: string, contenido: string): Documento {
      // Se usa un switch para elegir el tipo de documento
      switch (tipo) {
        case "texto":
          return new DocumentoTexto(contenido);
        case "imagen":
          return new DocumentoImagen(contenido);
        default:
          throw new Error("Tipo de documento no válido");
      }
    }
  }
  
  // Clase cliente que usa el patrón Abstract Factory
  class Cliente {
    static main() {
      // Se crea una instancia de la fábrica
      let fabrica: FabricaDocumentos = new FabricaDocumentosSimple();
  
      // Se crean instancias de diferentes tipos de documentos usando la fábrica
      let doc1: Documento = fabrica.crearDocumento("texto", "Hola mundo");
      let doc2: Documento = fabrica.crearDocumento("imagen", "paisaje.jpg");
  
      // Se usan los métodos de los productos
      doc1.mostrar();
      doc2.mostrar();
    }
  }
  
  // Ejecutar el código
  Cliente.main();
  