<template>
    <header class="heading">
        <a href="/" class="nav-logo"><img src="../assets/logo.png" alt="logo" class="nav-logo-img"></a>
        <nav class="nav">
            <ul class="nav-body">
                <li><a href="#" class="nav-link">Login</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    .heading {
        position: fixed;
        top: 0;
        padding: 10px 50px;
        width: 100%;
        background: rgb(247, 247, 247);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between
    }

    .nav-logo {
        align-self: center;
        text-decoration: none;
    }

    .nav-logo-img {
        height: 50px;
        width: auto;
    }

    .nav-body {
        display: flex;
        list-style: none;
            
            li {
                margin-right: 20px;
            }

    }

    .nav-link {
        font-weight: bold;
        text-decoration: none;
        color: gray;
    }
</style>
