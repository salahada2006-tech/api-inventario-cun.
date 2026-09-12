import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

// Clase Producto (Modelo)
class Producto {
    private int id;
    private String nombre;
    private double precio;
    private int stock;
    private String categoria;

    public Producto(int id, String nombre, double precio, int stock, String categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public double getPrecio() {
        return precio;
    }

    public int getStock() {
        return stock;
    }

    public String getCategoria() {
        return categoria;
    }

    @Override
    public String toString() {
        return String.format("%s (ID: %d, Precio: $%.0f, Stock: %d, Categoría: %s)", 
                nombre, id, precio, stock, categoria);
    }
}

// Clase Principal
public class Main {

    public static void main(String[] args) {
        // Carga de datos
        List<Producto> productos = Arrays.asList(
            new Producto(1, "Laptop Lenovo", 2800000, 8, "Tecnología"),
            new Producto(2, "Mouse Logitech", 120000, 25, "Tecnología"),
            new Producto(3, "Teclado Mecánico", 350000, 12, "Tecnología"),
            new Producto(4, "Silla Ergonómica", 850000, 5, "Muebles"),
            new Producto(5, "Escritorio", 1200000, 7, "Muebles"),
            new Producto(6, "Audífonos Sony", 450000, 18, "Audio"),
            new Producto(7, "Micrófono USB", 380000, 10, "Audio"),
            new Producto(8, "Monitor Samsung", 950000, 6, "Tecnología")
        );

        System.out.println("==========================================");
        System.out.println("   ANÁLISIS DE INVENTARIO (JAVA STREAMS)  ");
        System.out.println("==========================================\n");

        // 1. Obtener los productos cuyo precio sea mayor a $100.000
        List<Producto> mayores100k = productos.stream()
                .filter(p -> p.getPrecio() > 100000)
                .collect(Collectors.toList());
        
        System.out.println("1. Productos con precio mayor a $100.000:");
        mayores100k.forEach(p -> System.out.println("   - " + p.getNombre() + ": $" + p.getPrecio()));

        // 2. Calcular el valor total del inventario (precio * stock)
        double valorTotal = productos.stream()
                .mapToDouble(p -> p.getPrecio() * p.getStock())
                .sum();
        
        System.out.printf("\n2. Valor total del inventario: $%.2f\n", valorTotal);

        // 3. Encontrar el producto con mayor stock
        Producto masStock = productos.stream()
                .max(Comparator.comparingInt(Producto::getStock))
                .orElse(null);
        
        System.out.println("\n3. Producto con mayor stock:");
        System.out.println("   - " + (masStock != null ? masStock : "No encontrado"));

        // 4. Obtener un nuevo array (List) con categoría === "Tecnología"
        List<Producto> tecnologia = productos.stream()
                .filter(p -> "Tecnología".equalsIgnoreCase(p.getCategoria()))
                .collect(Collectors.toList());
        
        System.out.println("\n4. Productos de la categoría 'Tecnología':");
        tecnologia.forEach(p -> System.out.println("   - " + p.getNombre()));

        // 5. Buscar un producto por su id (Ejemplo: id = 5)
        int idABuscar = 5;
        Optional<Producto> productoBuscado = productos.stream()
                .filter(p -> p.getId() == idABuscar)
                .findFirst();
        
        System.out.println("\n5. Búsqueda de producto por ID (" + idABuscar + "):");
        System.out.println("   - " + productoBuscado.orElse(null));

        // 6. Generar un objeto (Map) con la cantidad de productos agrupados por categoría
        Map<String, Long> conteoPorCategoria = productos.stream()
                .collect(Collectors.groupingBy(Producto::getCategoria, Collectors.counting()));
        
        System.out.println("\n6. Cantidad de productos agrupados por categoría:");
        conteoPorCategoria.forEach((categoria, cantidad) -> 
            System.out.println("   - " + categoria + ": " + cantidad + " producto(s)")
        );
    }
}