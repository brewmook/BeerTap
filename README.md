Description
-----------

Reads a twitter feed for specially formatted messages describing beers on tap at a pub, turning them into a list of what's currently on tap.

Tweets must follow this simple format:

    OFF: Some beer
    ON: Another brew

Only one OFF or ON per tweet and they must be in that order, but you don't need to supply both. For example, these are also valid:

    OFF: Different booze

or

    ON: Tasty stuff

The app collects these together in chronological order and cancels out any previous ONs with an OFF so you end up with a list of current beers on tap.

For example, if these messages were collected:

    ON: Holy Hops
    ---
    OFF: Malty Goodness
    ON: Worts And All
    ---
    ON: Magic Bevvy
    ---
    OFF: Holy Hops
    ON: Great Grog

You'd end up with this list:

* Worts And All
* Magic Bevvy
* Great Grog

Plans
-----

It's heading in the direction of doing the tweeting in the correct format too.

Licence
-------

MIT Licence, see LICENCE.txt
