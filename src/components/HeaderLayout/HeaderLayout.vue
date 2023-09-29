<template>
  <v-app-bar
    :flat="true"
    :absolute="false"
    class="position-relative"
  >
    <v-container>
      <v-row class="justify-space-between align-center">
        <v-col
          cols="auto"
          lg="4"
        >
          <v-btn
            class="ma-2 text-h5"
            variant="text"
            icon="mdi-alpha-n-box"
            color="primary"
            :to="{ name: 'Home' }"
          />
        </v-col>
        <v-col
          lg="4"
          class="d-none d-lg-block text-center"
          cols="auto"
        />
        <v-col
          lg="4"
          class="text-right"
          cols="auto"
        >
          <v-row
            v-if="userStore.getUserInfo.id"
            class="justify-end align-center ma-n1"
          >
            <v-col
              cols="auto"
              class="pa-1"
            >
              <v-btn
                :to="{ name: 'Profile', params: { id: userStore.getUserInfo.id } }"
                variant="text"
                class="d-none d-lg-inline-flex"
              >
                <v-icon
                  icon="mdi-account"
                  size="large"
                />
              </v-btn>
            </v-col>
            <v-col
              cols="auto"
              class="pa-1"
            >
              <v-btn
                :to="{ name: 'Settings' }"
                variant="text"
                class="d-none d-lg-inline-flex"
              >
                <v-icon
                  icon="mdi-cog"
                  size="large"
                />
              </v-btn>
            </v-col>
          </v-row>
          <v-app-bar-nav-icon
            class="d-lg-none"
            @click="onClickMenu"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useDialogsStore } from '@/store/useDialogsStore';
import { useUserStore } from '@/store/useUserStore';

const dialogsStore = useDialogsStore();
const userStore = useUserStore();

const onClickFavorites = () => {
  // if (userStore.getIsUserAuth) {
  //   dialogsStore.toggleModal('favorites');
  //   return;
  // }
  // router.push({ name: 'Auth' });
  // notifyStore.addNotify('You need to be Authorized', 'Error');
};

const onClickMenu = () => {
  dialogsStore.toggleModal('menu');
};
</script>
