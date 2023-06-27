<template>
  <nav>
    <router-link to="/"  style="text-decoration: none; color: inherit;">
      <h3 class="brand">
        {{ title }}
      </h3>
    </router-link>

    <ul class="nav-lists" id="menu">
      <li class="nav-items">
        <button :id="leftID" @click="$emit('leftEvent')">
          {{ leftItem }}
        </button>
      </li>
      <li class="nav-items">
        <button :id="rightID" @click="$emit('rightEvent')">
          {{ rightItem }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    title: String,
    rightItem: String,
    leftItem: String,
    rightID: "",
    leftID: "",
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  margin: auto;
  // color: $primary-color;
  // background-color: $secondary-color;
  max-width: 1100px;
  padding-bottom: 15px;
  border-bottom: 1px black solid;
  .brand {
    margin-left: 20px;
    cursor: pointer;
  }

  .nav-lists {
    display: flex;
    justify-content: end;
    list-style: none;
    width: 500px;
    height: 100%;

    .nav-items {
      box-shadow: 5px 5px 0px 0px rgba(0, 0, 0, 0.75);
      border: 2px black solid;
      margin-left: 10px;
      button {
        // color: $primary-color;
        // font-weight: map-get($font-weights, regular);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0 10px;
      }
    }
    :hover {
      color: gray;
    }
  }

  .account {
    display: flex;
    width: 150px;
    margin-right: 20px;

    .log-in {
      cursor: pointer;
      position: relative;
    }
  }

  // &:hover {
  //     background-color: $primary-color !important;
  //     color: $secondary-color;

  //     .nav-items a {
  //         color: $secondary-color;
  //     }
  //     .sign-up {
  //         border: 2px solid $secondary-color !important;
  //     }
  // }
}
</style>
