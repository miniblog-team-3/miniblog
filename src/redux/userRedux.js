import { configureStore, createSlice } from "@reduxjs/toolkit";

const init = { count: 0, user: "홍길동" };

const countSlice = createSlice({
  name: "counter",
  initialState: init,
  reducers: {
    plus(state) {
      state.count += 1;
    },
    minus(state) {
      state.count -= 1;
    },
    sum(state, action) {
      state.count += action.payload;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

//Provider에 제공할 store
export let store = configureStore({
  reducer: {
    reducer1: countSlice.reducer, //리듀서1 이라는 키워드로 countSlice의 리듀서 함수를 제공하겠다.
  },
});

//제공할 리듀서 변수, 함수, state를 import 할 수 있게 export
export let { plus, minus, sum, reset } = countSlice.actions;
