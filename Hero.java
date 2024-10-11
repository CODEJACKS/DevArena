import java.util.Random;
import java.util.Scanner;

public class Hero {

  // These are the Class Properties of the Hero. These are just all the
  // attributes our player will have
  public String name;
  public int hpmax; // max health
  public int hp; // current health
  public int pow; // attack power
  public int armor;
  public int accuracy;
  public Boolean alive;
  public Item[] inventory;
  public int index = 0;
  public int grupees;
  public Hero(String n, int difficulty) {
    // This is the Constructor for our Hero Object
    // We will give our hero a name, and based on the difficulty
    // give our hero different health and power values

    this.name = n;// sets the name to the input name
    this.alive = true;
    this.grupees = 0;  
    if (difficulty == 1) {// medium mode
      this.hpmax = 30;
      this.hp = this.hpmax;
      this.pow = 3;
      this.armor = 1;
      this.accuracy = 70;
      this.inventory = new Item[4];
    } else if (difficulty == 2) {// hard mode
      this.hpmax = 12;
      this.hp = this.hpmax - 2;
      this.pow = 2;
      this.armor = 0;
      this.accuracy = 62;
      this.inventory = new Item[3];
    } else {// easy mode
      this.hpmax = 20;
      this.hp = this.hpmax;
      this.pow = 4;
      this.armor = 2;
      this.accuracy = 78;
      this.inventory = new Item[5];
    }
  }

  public Boolean fight(Enemy e) {
    Boolean live = false;
    Boolean run = false;

    while (this.hp > 0 && e.hp > 0 && !run) {
      System.out.println("");
      System.out.println(this.name + " attacks " + e.name);

      Random rand = new Random();

      if (rand.nextInt(100) < this.accuracy) {
        int dmg = this.pow - e.armor;
        if (dmg < 1) {
          dmg = 1;
        }

        e.hp -= dmg;

        System.out.println("	Hit! " + e.name + " took " + dmg
            + " damage");

        if (e.hp > 0) {
          System.out.println("	" + e.name + " has " + e.hp
              + " hp remaining");
        } else {
          System.out.println("");
          System.out.println(e.name + " was slain!");
          if (e.loot != null) {
            System.out.println(e.name + " dropped: ");

            e.loot.stats();
            System.out.println("");
            System.out.println("(take) or (discard)");

            Scanner l = new Scanner(System.in);

            String ch = l.nextLine();

            while (true) {
              if (ch.equals("take")) {
                this.pickup(e.loot);
                break;
              }
              if (ch.equals("discard")) {
                System.out.println("You left the loot behind");
              }
              System.out.println("(take) or (discard)");
              ch = l.nextLine();
            }

          } else {
            System.out.println(e.name + " wasn't carrying any loot");
            System.out.println("");
          }
          break;
        }

      } else {
        System.out.println("	Miss!");
      }

      System.out.println(e.name + " attacks " + this.name);

      if (rand.nextInt(100) < e.accuracy) {
        int dmg = e.pow - this.armor;
        if (dmg < 1) {
          dmg = 1;
        }
        this.hp -= dmg;
        System.out.println("	Hit! " + this.name + " took " + dmg
            + " damage");
        if (this.hp > 0) {
          System.out.println("	" + this.name + " has " + this.hp
              + " hp remaining");
        } else {
          System.out.println("You were slain in battle! ");
          this.alive = false;
          System.exit(0);
          break;
        }
      } else {
        System.out.println("	Miss!");
      }

      Scanner r = new Scanner(System.in);
      System.out.println("");
      System.out.println("Would you like to run from battle? You may be hit as you run...");

      System.out.println("(yes) or (no)");

      String running = r.nextLine();

      while (true) {
        if (running.equals("yes")) {
          run = true;
          break;
        }
        if (running.equals("no")) {
          break;
        }
        System.out.println("(yes) or (no)");
        running = r.nextLine();
      }

    }
    if (run) {
      System.out.println("");
      System.out.println("You run from the fight...");
      int rundmg = 3 - this.armor;
      if (rundmg < 0)
        rundmg = 0;
      System.out.println("As you run you are hit for " + rundmg
          + " damage");
      this.hp -= rundmg;
      System.out.println(this.name + " has " + this.hp + "hp remaining");
      if (this.hp <= 0) {
        System.out.println("You were killed while running away");
        this.alive = false;
      }
    }
    if (this.hp > 0) {
      live = true;
    }
    this.printStats();
    return live;
  }

  public void printStats() {
    System.out.println("  ---- " + name + " ----");
    System.out.println("  | Health: " + hp + "/" + hpmax);
    System.out.println("  | Power: " + pow);
    System.out.println("  | Armor: " + armor);
    System.out.println("  | Accuracy: " + accuracy + "%");
    System.out.println("  | Grupees: " + grupees);
  }

  public void printInventory() {
    System.out.println("Current Inventory: ");
    for (int i = 0; i < inventory.length; i++) {
      if (inventory[i] != null) {
        System.out.print(i);
        inventory[i].stats();
      }
    }
  }

  public void pickup(Item it) {
    this.cleanInventory();
    if (index < inventory.length) {
      inventory[index] = it;
      index++;
      it.addStats(this);
      System.out.println(it.name + " was added to inventory!");
      this.printInventory();
    } else {
      System.out.println("Inventory Full! Select an item to discard...");
      this.printInventory();
      System.out.println("Enter the item slot number to drop");
      String list = "";
      for (int i = 0; i < index; i++) {
        list += "(" + i + ") ";
      }
      System.out.println(list);
      Boolean done = false;
      while (!done) {
        try {
          Scanner dr = new Scanner(System.in);
          int a = dr.nextInt();
          this.drop(a);
          this.pickup(it);
          this.cleanInventory();
          break;
        } catch (Exception e) {
          System.out.println("Invalid choice, try again...");
        }
      }
    }
  }

  public void heal(int i) {
    this.hp += i;
    if (hp > hpmax)
      hp = hpmax;
  }

  public void drop(int i) {
    inventory[i].subStats(this);
    System.out.println(inventory[i].name + " was discarded");
    inventory[i] = null;
    this.cleanInventory();
  }

  public void cleanInventory() {
    // All this does is move the inventory items to the leftmost spaces
    // no need to worry about it
    Boolean done = false;
    while (!done) {
      int firstSpace = -1;
      int lastItem = -1;
      Boolean firstSpaceFound = false;
      for (int i = 0; i < inventory.length; i++) {
        if (inventory[i] != null) {
          lastItem = i;
        } else if (!firstSpaceFound) {
          firstSpace = i;
          firstSpaceFound = true;
          this.index = i;
        }
      }
      if (lastItem > firstSpace && firstSpaceFound) {
        inventory[firstSpace] = inventory[lastItem];
        inventory[lastItem] = null;
      } else if (!firstSpaceFound) {
        done = true;
        this.index = inventory.length;
      } else {
        done = true;
      }
    }
  }
}