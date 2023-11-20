// 리마인드) static 내부의 this는 클래스이고 static(정적)이 아닌 변수나 메서드는 인스턴스 멤버이다.

class Singleton {
  private constructor() {}
  private static instance: Singleton;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }

    return this.instance;
  }
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log(a === b);

class Singleton2 {
  private constructor() {}
  private static instance: Singleton = new Singleton2();

  public static getInstance() {
    return this.instance;
  }
}

const c = Singleton2.getInstance();
const d = Singleton2.getInstance();

console.log(c === d);

class Singleton3 {
  private constructor() {}
  private static instance: Singleton3;

  static {
    try {
      this.instance = new Singleton3();
    } catch (error) {
      throw Error("Exception occured in creating singleton instance");
    }
  }

  public static getInstance() {
    return this.instance;
  }
}

const e = Singleton3.getInstance();
const f = Singleton3.getInstance();

console.log(e === f);

// 이런 중첩 클래스 생성은 자바에서 가능함
// class Singleton3 {
//   private constructor() {}
//   private static class SingletonHelper {
//     private static instance = new Singleton3();
//   }

//   public static getInstance() {
//     return SingletonHelper.instance;
//   }
// }
