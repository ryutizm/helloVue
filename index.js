const app1 = new Vue ({
  el: "#app1",
  data: {
    greet: "Hello Vue!",

  }
});

const app2 = new Vue ({
  el: "#app2",
  data: {
    message: "You loaded this page on " + new Date().toLocaleString()
  },
});

const app3 = new Vue ({
  el: "#app3",
  data: {
    seen: true,
  }
});
""
const app4 = new Vue ({
  el: "#app4",
  data: {
    todoList: [
    { text: "Learn JS"},
    { text: "Learn Vue"},
    { text: "Build something awesome"},
    ]
  }
});

const app5 = new Vue ({
  el: "#app5",
  data: {
    message: "Hello Vue.js!",
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split("").reverse().join("")
    },
  },
});

const app6 = new Vue ({
  el: "#app6",
  data: {
    message: "Hello Vue!"
  },
});

// Vue.componentメソッドでコンポーネントを作成
// 第一引数:名前, 第二引数:内容(オプション)
Vue.component("todo-item", {
  props: ["todo"],
  template: "<li>{{ todo.text }}</li>"
});

const app7 = new Vue ({
  el: "#app7",
  data: {
    groceryList: [
      { id: 0, text: "Vegetables" },
      { id: 1, text: "Cheese" },
      { id: 2, text: "Whatever else humans are supposed to eat" },
    ],
  },
});

Vue.component("button-count", {
  // コンポーネントのdataオプションは関数
  // 関数にしないとインスタンスが同じデータを共有する
  data() {
    return {
      count: 0
    };
  },
  methods: {
    addCount() {
      this.count += 1;
    },
  },
  template: 
  `<button @click="addCount">
      悪魔の実を食べる<br>
      能力者{{ count }}人
  </button>`,

});

const app8 = new Vue ({
  el: "#app8",

});

Vue.component("button-2characters", {
  template: 
  `<div>
    <button>ゾロ</button>
    <button>サンジ</button>
  </div>`
});

const app9 = new Vue({
  el: "#app9",

});

Vue.component("button-3characters", {
  data() {
    return {
      characters: [
        "ルフィ",
        "ナミ" , 
        "ウソップ",
        // {name: "ルフィ", url: "https://unsplasu.com"}, 
        // {name: "ナミ", url: "https://unsplasu.com"}, 
        // {name: "ウソップ", url: "https://unsplasu.com"},
      ]
    };
  },
  template: 
    `<div>
      <button 
        v-for="character in characters"
      >
        {{ character }}
      </button>
    </div>`,
});

const app10 = new Vue ({
  el: "#app10",
});


Vue.component("button-5characters", {
  template: 
    `<div>
      <button-2characters></button-2characters>
      <button-3characters></button-3characters>
    </div>`
});

const app11 = new Vue ({
  el: "#app11"
});



//1．コンポーネントを変数/定数(オブジェクト)として定義
const characters = {
  template: 
  `<div>
    <button-2characters></button-2characters>
    <button-3characters></button-3characters>
  </div>`,
};

const app12 = new Vue ({
  el: "#app12",
  // 2.コンポーネントとして設定
  components: {
    "local-characters": characters,
    // {
    //   template: 
    //   `<div>
    //     <button-2characters></button-2characters>
    //     <button-3characters></button-3characters>
    // </div>`,
    // },
  },
});

// 子コンポーネント
const child = {
  template: `<p>エース</P>`
};

const family = {
  components: {
    "d-child": child
  },
  template: 
    `<p>ロジャーの子供は<br><d-child></d-child></p>`
};

const app13 = new Vue ({
  el: "#app13",
  components: {
    "d-family": family
  },

});

// 子はpropsオプションで受け取る
const d_child = {
  template: `<p>ポートガス{{ initial }}エース</P>`,
  // 親の属性名とPropsの値を同じにする
  props: [ "initial" ],
};

const d_family = {
  data() {
    return {
      name: "・D・"
    }
  },
  components: {
    "d-child": d_child
  },
  // 親から子へは属性を利用
  template: 
    `<p>
      ゴール{{ name }}ロジャーの子供は<br>
      <d-child :initial="name"></d-child>
    </p>`
};

const app14 = new Vue ({
  el: "#app14",
  components: {
    "d-family": d_family
  },

});


// 1.子:変更する値を親へ送信($emitを利用)
const a_child = {
  template: 
    `<p>
      エース({{ age-55 }})
      <button @click="AgeEvent">
        年齢+1
      </button>
    </p>`
    ,
  props: ["age"],
  methods: {
    AgeEvent() {//$emit(名前, 親へ渡す値)
      this.$emit("grow-old", this.age)
    }
  }
};

const a_family = {
  data() {
    return {
      age: 55,
    }
  }, //2.子のデータをv-onで監視する(イベントを購読)
  template: 
    `<p>ロジャー({{ age }})の子供は<br>
      <a-child 
      :age="age"
      @grow-old="getAge"
      >
      </a-child>
    </p>`
  ,
  methods: {
    getAge(child_age) {
      this.age = child_age + 1;
    }
  },
  components: {
    "a-child": a_child,
  },
};

const app15 = new Vue ({
  el: "#app15",
  components: {
    "a-family": a_family,
  },

});