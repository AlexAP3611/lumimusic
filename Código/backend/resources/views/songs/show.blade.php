<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pruebas CRUD Laravel</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">

<div class="max-w-4xl mx-auto space-y-8">

    <h1 class="text-3xl font-bold text-gray-800 border-b pb-4">Panel de Pruebas CRUD</h1>

    <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-blue-600">1. Listado (Index / GET)</h2>
        <table class="w-full text-left border-collapse">
            <thead>
            <tr class="bg-gray-50">
                <th class="p-3 border">ID</th>
                <th class="p-3 border">Nombre</th>
                <th class="p-3 border">Acciones</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td class="p-3 border text-gray-400 italic">#</td>
                <td class="p-3 border text-gray-400 italic">Sin datos cargados...</td>
                <td class="p-3 border space-x-2">
                    <button class="text-blue-500 hover:underline">Ver</button>
                    <button class="text-yellow-600 hover:underline">Editar</button>

                    <form action="#" method="POST" class="inline">
                        <input type="hidden" name="_method" value="DELETE">
                        <button type="submit" class="text-red-500 hover:underline">Eliminar</button>
                    </form>
                </td>
            </tr>
            </tbody>
        </table>
    </section>

    <section class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4 text-green-600">2. Formulario (Crear o Editar)</h2>

        <form action="#" method="POST" class="space-y-4">
            <input type="hidden" name="_token" value="VALOR_CSRF_AQUÍ">

            <div>
                <label class="block text-sm font-medium text-gray-700">Título / Nombre</label>
                <input type="text" name="title" class="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ej: Mi primera entrada">
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Contenido</label>
                <textarea name="content" rows="4" class="mt-1 block w-full p-2 border rounded-md shadow-sm" placeholder="Escribe algo interesante..."></textarea>
            </div>

            <div class="flex justify-end">
                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Guardar Recurso
                </button>
            </div>
        </form>
    </section>

</div>

</body>
</html>
