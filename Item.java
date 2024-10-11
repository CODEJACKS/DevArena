public class Item {
  public String name;
  public int hpmax;
  public int hp;
  public int pow;
  public int armor;
  public int accuracy;

  public Item(String name, int hpmax, int hp, int pow, int armor, int accuracy) {
    this.name = name;
    this.hpmax = hpmax;
    this.hp = hp;
    this.pow = pow;
    this.armor = armor;
    this.accuracy = accuracy;
  }

  public void stats() {
    System.out.println("------------------");
    System.out.println(name);
    if (hpmax != 0) {
      System.out.println("+Max HP: " + hpmax);
    }
    if (hp != 0) {
      System.out.println("+Current HP: " + hp);
    }
    if (pow != 0) {
      System.out.println("+Power: " + pow);
    }
    if (armor != 0) {
      System.out.println("+Armor: " + armor);
    }
    if (accuracy != 0) {
      System.out.println("+Accuracy: " + accuracy);
    }
    System.out.println("------------------");
  }

  public void addStats(Hero h) {
    h.hpmax += this.hpmax;
    h.hp += this.hp;
    h.pow += this.pow;
    h.armor += this.armor;
    h.accuracy += this.accuracy;
  }

  public void subStats(Hero h) {
    h.hpmax -= this.hpmax;
    h.hp -= this.hp;
    h.pow -= this.pow;
    h.armor -= this.armor;
    h.accuracy -= this.accuracy;
  }
}