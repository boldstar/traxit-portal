<template>
    <header class="heading">
        <nav class="nav">
            <ul class="nav-body">
                <li>Link 1</li>
                <li>Link 2</li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {

}
</script>

<style>
    .heading {
        position: fixed;
        top: 0;
        padding: 20px 50px;
        width: 100%;
        background: lightgray;
        box-sizing: border-box;
    }

    .nav-body {
        display: flex;
    }
</style>
