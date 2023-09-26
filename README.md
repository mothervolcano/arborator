## Background

This project emerged from my fascination with the subject of a book I stumbled upon: 'The Algorithmic Beauty of Plants.' The author, Aristid Lindenmayer, a botanist, developed a mathematical theory to describe plant topology, which later evolved into a framework for modeling the development of branching structures in general. L-Systems, as they became known, found applications far beyond the field of biology in diverse fields such as urbanism, computer graphics, and even programming languages.

L-systems belong to the category of formal grammars. They are based on a set of symbols called an alphabet, which form strings through an iterative and recursive process. As with most formal grammars, the core mechanism is governed by so-called production rules. Production rules determine how symbols are replaced after each iteration to form increasingly longer strings.

The elegance and simplicity of their mechanism inspired me to try a simple and straightforward implementation in JavaScript. Observing the fascinating and often beautiful patterns, structures, and shapes that emerge from a concise set of rules made me understand why the L system is so widely adopted in many different fields.

Before I knew it, what started as curiosity evolved into something of a passion. For this reason, I decided to continue my mild experimentation and start two projects: Arborator and FASS. These projects not only help me expand my understanding of  L-Systems concepts, but also serve as a personal challenge to take my coding skills to a new level.


## L-Systems 101

Like most formal grammars, L-Systems consist of:

- An alphabet of symbols
- A set of production rules
- An axiom

Let's consider the simplest model that can be generated using an L-System: the growth of algae.

For this, we need an alphabet with at least 2 symbols, designated as 'A' and 'B'.

Each symbol represents a stage in the organism's growth:

- 'A' signifies a directional segment of growth, such as a filament, stem, trunk, or branch.
- 'B' represents a branching node.

Next, we define production rules as follows:

- A → AB
- B → A

These rules instruct us to replace "A" with "AB" and "B" with "A."

The axiom serves as our starting point, initially consisting of a single "A."

We initiate the process by applying these production rules to every symbol. The first 5 iterations would appear as follows:

1. A
2. AB
3. ABA
4. ABAAB
5. ABAABABA

Continuing this iterative process leads to the expansion of the string. With each iteration, new branches (represented by "B") emerge from existing ones, resulting in a natural, self-replicating pattern.

However, 'ABAABABA' remains an abstraction that provides limited insight into the actual configuration and shape of the growing algae. It serves as a topological representation, illustrating how elements are organized in terms of their relative positions but missing spatial relationships such as distance, angle, and length of growth.

While we understand that 'B' represents branching, it only indicates where branching occurs and what follows. We can discern that two 'A's follow, but we remain unaware of their degree of divergence, their directional orientation, or the extent of growth they represent.

This is the frontier.

Objectives

The approach taken is not so much focused on discovering a novel solution to the graphical modeling problem as it is on extending the logic of L-Systems into a more adaptable and practical framework that isn’t tied to any particular field of knowledge. A set of modular tools for free visual exploration and creation.

The paradigm at the center of many solutions seemed to revolve around this ideal of mathematical beauty that is to define a model in the purest terms possible and then, sit back and watch the creation unfold all by itself.

While I’m not insensitive at all to the beauty of this, my approach is more concerned with the practical realities of the creative process for whom mathematics and nature are not the goal in itself but rather the means.

This framework's objective is to harness the power and beauty of L-Systems as a versatile tool adaptable to various creative and design purposes. As such the whole rationale behind it prioritizes considerations such as how, when, where, and to what extent the user can decide how much of the generative process relies on the algorithm, as opposed to how much is left to his deliberation. Practical concerns like these take precedence over theoretical considerations related to formal grammars or fidelity to biological processes.

In summary, this framework aims to offer the capabilities of nature-like procedural generation while remaining pliable to the creative vision and intent of the user, whatever that vision may be.


## Approach

As we exposed above first challenge we’re faced with when using L-Systems for visual procedural generation is how to bridge and translate a topological representation into a model that can be expressed visually.

How to translate writing into drawing, that is.

Algorithmic Beauty of Plants addresses precisely this problem, and this framework does not depart significantly from what has been attempted and proposed in the book.

As with all previous graphical interpretations of L-Systems, this framework takes a post-processing approach to the problem owing and honing most of the concepts and ideas to this mind opening book.

This framework operates in two distinct phases: 

The writing phase, where the sequence of symbols is generated based on defined production rules.

The drawing phase, where this sequence is interpreted and translated to drawing commands and operations.

The introduction of new symbols into the alphabet is necessary to introduce drawing commands, without which rendering the structure encoded in the string would be impossible. Symbols such as ‘+’ or ‘-’  instruct the drawing tool of choice to turn left or right by a defined number of degrees. Other less obvious but equally fundamental are the ‘[’ and ‘]’ symbols that hold the instructions to save and restore the state of drawing without which it wouldn’t be possible to draw branches. 

As a consequence the resulting string after figuring out where the symbols should be incorporated in the production rules to achieve the expected result will resemble something like this:

ABAABABA

A[B][+A][-A[B]][+A[B][-A]][+A[B][-A][+A[B]]]

Further drawing instructions such as move forward a step are assigned to the ‘A’ symbol directly whereas the ‘B’ symbol remains without any drawing command associated with it.

From the perspective of the goals of this framework this was problematic and looked to me as a liability moving forward.

Not only some symbols accumulated drawing responsibilities on top of writing responsibilities but also created a tight dependency here. Many other questions rose [ add examples ] and feared ending up with a cumbersome and opaque system if this issue wasn’t addressed at the very start. This would compromise the separation of writing from drawing which seemed to me as essential to achieve the level of modularity and control I was aiming for.

Some formal grammars make a clear distinction between terminal and non-terminal symbols, some prescribing that only the former make part of the alphabet. Looking at L-Systems from the point of view of other formal grammars it seemed to me that the framework would benefit from adopting the same principle. A drawing command could very well be considered a terminal symbol.

This is one of the foundational features of this framework: a clear and complete separation of the writing phase from the drawing phase which wouldn’t be complete if the symbols weren’t separated as well and clearly defined in which side of the system they operate.

My solution was to create clear and functional categories of symbols that I’ve called ‘Glyphs’.


## Glyphs
