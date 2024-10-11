import java.util.Scanner;

public class Main {

  @SuppressWarnings("resource")
  public static void main(String[] args) {

    System.out.println("Welcome To The Story Of Zelde");
    System.out.println("Enter a Name for Your Hero...");

    Scanner scan = new Scanner(System.in);
    String n = scan.nextLine();
    Hero h = new Hero(n, 1);

    h.printStats();
    System.out.println("");
    System.out.println("You wake up in a dark cave. You see a sword and a bow. You can only carry one...");

    Item bow = new Item("Bow", 0, 0, 3, 0, 50);

    Item sword = new Item("Sword", 0, 0, 5, 0, 0);

    bow.stats();
    sword.stats();
    System.out.println("");
    System.out.println("(take bow) or (take sword)");

    String choice = scan.nextLine();

    while (true) {

      if (choice.equals("take bow")) {
        System.out.println("");
        System.out.println("You pick up the bow");
        h.pickup(bow);
        break;
      }
      if (choice.equals("take sword")) {
        System.out.println("");
        System.out.println("You pick up the sword");
        h.pickup(sword);
        break;
      }
      System.out.println("(take bow) or (take sword)");
      choice = scan.nextLine();

    }

    System.out.println("");
    System.out.println("A Giant Rat Attacks from the Darkness!");
    System.out.println("Fighting it may grant loot...");
    System.out.println("(fight) or (run)");

    choice = scan.nextLine();

    while (true) {
      if (choice.equals("fight")) {
        Enemy e1 = new Enemy("Giant Rat", 11, 3, 0, new Item("Leather", 3, 0, 0, 1, 0));
        h.fight(e1);
        break;
      }
      if (choice.equals("run")) {
        System.out.println("You escaped, but dropped your weapon...");
        h.drop(0);
        break;
      }
      System.out.println("(fight) or (run)");
      choice = scan.nextLine();
    }

    System.out.println("");
    System.out.println("You see a light in the distance. There are scurrying noises in the cave");
    System.out.println("(investigate light) or (rest)");

    choice = scan.nextLine();

    while (true) {
      if (choice.equals("rest")) {
        System.out.println("You stop to catch your breath, 3 health restored");

        h.heal(3);
        h.printStats();

        System.out.println("A Cave Bat attacks!");

        h.fight(new Enemy("Cave Bat", 5, 5, 0, null));
        break;
      }
      if (choice.equals("investigate light")) {
        break;
      }
      System.out.println("(investigate light) or (rest)");
      choice = scan.nextLine();
    }

    System.out.println("");
    System.out.println("You head towards the light.");
    System.out.println("");
    Item buplex_bow = new Item("Buplex bow", 0, 0, 6, 0, 100);
    Enemy Chest = new Enemy("Chest", 1, 1, 0, buplex_bow);
    Item Zelde = new Item("Zelde", 100, 0, 0, 0, 0);
    Enemy Rannon_gwarf = new Enemy("Rannon Gwarf", 80, 8, 5, Zelde);

    Item moster_sword = new Item("moster sword", 60, 15, 15, 15, 15);
    Enemy Chest2 = new Enemy("Chest", 0, 0, 1, null);
    Item apprentice_sword = new Item("apprentice sword", 0, 0, 7, 1, 90);
    Enemy koboklin = new Enemy("koboklin", 10, 5, 2, apprentice_sword);
    Enemy galus = new Enemy("Galus", 30, 9, 3, moster_sword);

    System.out.println("-------------------------------------------------------------------");

    System.out.println("while you were heading to the light you fell into a hole! ");
    System.out.println(" you find a shovel ");
    Item Shovel = new Item("Shovel", 0, 2, 3, 0, 1);
    System.out.println("(pick up shovel) or (leave shovel)");

    choice = scan.nextLine();

    while (true) {

      if (choice.equals("pick up shovel")) {
        h.pickup(Shovel);
        System.out.println("you picked up the shovel and dug your way out");
        System.out.println("");
        System.out.println("when you climb out you encounter a borok ");
        Item shield = new Item("shield", 100, 0, 0, 7, 0);
        Enemy borok = new Enemy("borok", 5, 2, 0, shield);
        h.fight(borok);
        System.out.println("you are in a forest then encounter a koboklin ");
        h.fight(koboklin);

        System.out.println("oh no a galus!");
        h.fight(galus);
        System.out.println("");
        System.out.println("you exit the forest and go to lay down");
        System.out.println("but not before you find a chest");
        System.out.println("");
        System.out.println("it might contain a better bow!");
        h.grupees += 7;
        h.fight(Chest);
        System.out.println("You also got some grupees ");
        System.out.println("");
        System.out.println("");
        System.out.println("you go to the castle to fight rannon gwarf ");
        System.out.println("");
        System.out.println("");
        System.out.println("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        System.out.println("you walk through the castle and find a chest");
        h.grupees += 100;
        h.fight(Chest2);
        System.out.println("you got 100 Grupees");
        System.out.println("you go to rest");
        h.heal(500);
        System.out.println("you wake up to find rannon gwarf!");
        h.fight(Rannon_gwarf);
        System.out.println("you defeat Rannon Gwarf and rescue Zelde!!!!!!");
        System.out.println("-----------THE END----------");
        System.out.println("TO FIND OUT WHAT HAPPENS NEXT PLAY STORY OF ZELDE: CRYING KINGDOM!");
        System.out.println(" Coming out August 2023");

        break;
      }
      if (choice.equals("leave shovel")) {
        System.out.println("you leave the shovel and try to climb out");
        h.heal(-3);
        System.out.println("you lost 3 HP");
        h.printStats();
        System.out.println(" you climb out and find a koboklin");
        System.out.println("oh no a galus!");
        h.fight(koboklin);
        h.fight(galus);
        System.out.println("you walk out of the forest and lay down to rou got some grupees ");
        System.out.println("");
        System.out.println("");
        System.out.println("you go to the castle to fight rannon gwarf ");
        System.out.println("");
        System.out.println("");
        System.out.println("but not before you find a chest!");
        h.grupees += 5;
        h.fight(Chest);
        System.out.println("");
        System.out.println("");
            System.out.println("---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
        System.out.println("you walk through the castle and find a chest");
        h.grupees += 100;
        h.fight(Chest2);
        System.out.println("you got 100 Grupees");
        System.out.println("you go to rest");
        h.heal(500);
        System.out.println("you wake up to find rannon gwarf!");
        h.fight(Rannon_gwarf);
        System.out.println("you defeat Rannon Gwarf and rescue Zelde!!!!!!");
        System.out.println("-----------THE END----------");
        System.out.println("TO FIND OUT WHAT HAPPENS NEXT PLAY STORY OF ZELDE: CRYING KINGDOM!");
        System.out.println(" Coming out August 2023");

        break;
      }

      System.out.println("(pick up shovel) or (leave shovel");
      choice = scan.nextLine();

    }

  }
}