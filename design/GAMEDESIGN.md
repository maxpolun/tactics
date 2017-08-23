# Codename Tactics: A rougelike tactical RPG

This document is the high-level design of the game, details will be in other documents linked from this one.

## Concept

A Rougelike tactical RPG inspired historically by the fall of Rome.

* You play the commander of a squad of imperial guard troops
* The game's plot opens with the the Emperor being assasinated and a civil war starting
* You the play get to chose what course of action to take, with a range of outcomes ranging from total breakup of the empire, you becoming a new emperor, the world being consumed by demons, to the empire reforming into a republic.
* Along the way, you will take part in a number of squad level battles against procedurally generated opponent squads and armies.
* The maps available, choices offered, your troops (other than yourself), enemy troops, are all procedurally generated.
* All endings should be possible from any playthrough depending on player choices and execution, but some are much more common than others.
* An expected run for a single playthrough would be around 15-20 battles, each about a half-hour, giving 7.5-10 hours per playthrough.
* Grinding is not possible -- you will have a choice to engage in certain battles, but there are not unlimited battles in a single playthrough
* Typical roguelike rules -- permadeath and procedural generation.

## Setting

## Mechanics

### Tactical RPG

* The Tactical RPG battle consist of 2 or more teams. One team is player controlled.
* Each team consists of several units
* The battlefield is 3D terrain, with a variety of object/obsticles
* The battlefield can be various sizes, but is always divided up into a grid.
  * The grid might be typically around 40x40 squares
* The goal of each battle varies, but is usually either to kill all enemies, a single enemy, or to capture some point in the battlefield

### Strategic Map

* This is where the player plans and makes decisions
* The player can move to different locations around the map
  * The map is node-based. It has certain discreet locations
* This map has various events, both scripted and random
  * In these events, the player will always see some flavor text (and possibly some dialog)
  * The player may or may not have a chance to choose between different options, and the result of the event will depend on their choices
  * These events may result in:
    * A chance to buy items/equipment
    * A chance to recruit new units
    * New locations open on the map
    * a change in hidden variables that affect the ending
    * A battle may begin

