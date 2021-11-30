<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-info">
            <a class="navbar-brand">Notes App</a>
            <a href="/"><i class="fas fa-home fa-lg"></i></a>
        </nav>
        <div class="container mt-3">
            <router-view />
        </div>
    </div>
</template>

<script>

export default {
    name: "App",
};

</script>

<style>
.fa-home {
    color: white;
}
.fa-home:hover {
    color: orange;
}
</style>
