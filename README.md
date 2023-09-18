### Intro

L-Systems, short for Lindenmayer Systems, are a class of mathematical models and formal grammars originally developed by Aristid Lindenmayer to describe the growth patterns of plants. However, they've been adapted for various applications, from procedural generation to fractal design and even music composition. The core idea is to start with an "axiom," a basic string of characters, and then iteratively replace those characters based on a set of "production rules."

Here's a simplified breakdown of the key components:

- Axiom: The initial state, represented as a string. It serves as the starting point for the system's evolution.

- Alphabet: A set of symbols that constitute the strings in the L-System.

- Production Rules: A set of rules defining how each symbol in the alphabet should be replaced in each iteration. For example, if you have a rule that says "A -> AB" and an axiom of "A", then in the next iteration, your string will be "AB".


Example: The Algae Growth L-System
Axiom: A
Alphabet: { A, B }
Production Rules:
A -> AB
B -> A


In this example:

Start with A (the axiom)
Apply the rules:
A -> AB
B -> A


Iterations:

0: A
1: AB
2: ABA
3: ABAAB
4: ABAABABA
...


L-Systems can be used to create complex fractal structures, or biological models that emulate the branching of trees and biological organism growth.
