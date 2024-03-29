const { exportAllDeclaration } = require("@babel/types");
const { default: TestRunner } = require("jest-runner");
const { JestHook } = require("jest-watcher");
const Enemy = require("../lib/Enemy.js");
const Potion = require("../lib/Potion");
jest.mock("../lib/Potion.js");

test("creates an enemy object", () => {
  const enemy = new Enemy("goblin", "sword");

  expect(enemy.name).toBe("goblin");
  expect(enemy.weapon).toBe("sword");
  expect(enemy.health).toEqual(expect.any(Number));
  expect(enemy.strength).toEqual(expect.any(Number));
  expect(enemy.agility).toEqual(expect.any(Number));
  expect(enemy.potion).toEqual(expect.any(Object));
});
test("gets enemies health value", () => {
  const enemy = new Enemy("Dave");

  expect(enemy.getHealth()).toEqual(
    expect.stringContaining(enemy.health.toString())
  );
});

test("checks if enemy is alive or not", () => {
  const enemy = new Enemy("Dave");

  expect(enemy.isAlive()).toBeTruthy();

  enemy.health = 0;

  expect(enemy.isAlive()).toBeFalsy();
});

test("subtracts from the enemy's health", () => {
  const enemy = new Enemy("Dave");
  const oldHealth = enemy.health;

  enemy.reduceHealth(5);

  expect(enemy.health).toBe(oldHealth - 5);

  enemy.reduceHealth(999999);

  expect(enemy.health).toBe(0);
});

test("gets a description of the enemy", () => {
  const enemy = new Enemy("goblin", "sword");

  expect(enemy.getDescription()).toEqual(expect.stringContaining("goblin"));
  expect(enemy.getDescription()).toEqual(expect.stringContaining("sword"));
});
