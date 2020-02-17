<template>
    <v-container>
        <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" xs="12" lg="6">
                <v-card-title>Settings</v-card-title>
                <v-card outlined tile>
                    <v-switch
                        v-model="switch1"
                        label="Lorem Ipsum"
                    ></v-switch>
                </v-card>
                <v-card outlined tile>
                    <v-switch
                        v-model="switch2"
                        label="Lorem Ipsum"
                    ></v-switch>
                </v-card>
                <v-card outlined tile>
                    <v-switch
                        v-model="switch3"
                        label="Lorem Ipsum"
                    ></v-switch>
                </v-card>
                <v-card outlined tile>
                    <v-switch
                        v-model="switch4"
                        label="Lorem Ipsum"
                    ></v-switch>
                </v-card>
                <v-card outlined tile>
                    <v-switch
                        v-model="switch5"
                        label="Lorem Ipsum"
                    ></v-switch>
                </v-card>
            </v-col>
            <v-spacer></v-spacer>
        </v-row>
    </v-container>
</template>

<script>
export default {
  data: () => {
    return {
      switch1: false,
      switch2: false,
      switch3: false,
      switch4: false,
      switch5: false
    }
  }
}
</script>

<style scoped>

</style>
