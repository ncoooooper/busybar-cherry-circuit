# Cherry Circuit

Spin three reels on the bar. Cherries, sevens, bells, oranges and BAR tiles stop in sequence. A pair counts as a win and three matching symbols make a triple. The rear display keeps the session’s spins and your saved win total.

## Screen transitions

Start a spin and watch the three reels slow and stop in sequence. The symbols stay visible above the lower edge of each window.

![Cherry Circuit front display. Start a spin and watch the three reels slow and stop in sequence. The symbols stay visible above the lower edge of each window.](media/guide/screen-transitions.gif)

<details>

<summary>Watch the rear display</summary>

![Cherry Circuit rear display during the recorded controls](media/guide/screen-transitions-rear.gif)

</details>

## Setup

Open **Cherry Circuit** and press the wheel. No account or network connection is required. Each reel has five equally likely symbols. A round costs nothing and has no payout. Spins during a running round are ignored.

## Spin the three reels

Click once. The left reel stops first, followed by the middle and right reels. Watch the symbols settle along the center line. Read the result on the back.

![Three pixel reels spin and stop one by one.](media/guide/use-1.gif)

## Play another round

Press Start after the previous spin finishes. A matching pair or triple marks the reels and increments wins. Three different symbols count as a miss. Play as many rounds as you like. Closing the app resets the session spin count and keeps the win total.

![Start spins a fresh set of reels.](media/guide/use-2.gif)

## Read the payline

A pair draws a green line under the two matching reels. A triple draws three gold lines and sends a glint along their upper edges. On a miss, three short amber marks fade as the reels settle. You can start the next spin as soon as the last reel stops.

![Two green lines under a pair, three gold lines under a triple, then three fading amber marks on a miss](media/guide/paylines.gif)

The example uses a fixed symbol sequence to show all three outcomes. The installed game draws each reel independently.

## Run in the emulator

Install BUSY Bar Emulator and open it. From this repository run the following command, then press **Back** when you finish.

```sh
~/.busy-emulator/bin/busy-emulator dev --once
```

The recordings show device controls on emulator firmware. Each LED occupies a 16 × 16 cell with a black border.

[Rear display](screenshots/back-1.png) · [MIT license](LICENSE)
