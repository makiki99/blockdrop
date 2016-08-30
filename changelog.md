## Changelog

### v2.0.3
* FIX | Fixed level bar not showing up.
* FIX | Somehow improved performance.

### v2.0.2
* FIX | Fixed a very stupid error causing players to be unable to change the sfx volume.

### v2.0.1
* FIX | Claustrophobia mode is now back playable.

### v2.0.0
* FEATURE | Added SFX! Yay!
* FEATURE | Added playcount counter.
* FIX | Now the level counter can't roll past end level.

### v1.7.0
* FEATURE | Added sound effects.

### v1.6.0
* FEATURE | Added a message when player plays for the first time on the current version.
* FIX | Prevented accidental opening of the links below the game screen.
* FIX | Grade now updates on profile load.
* FIX | Separated "there is already a profile with this name" into 3 lines.

### v1.5.2
* CHANGE | Rebalanced grade requirements.

### v1.5.1
* FIX | Fixed level bar display in Claustrophobia mode.

### v1.5.0
* FEATURE | Created new mode category - Special
* FEATURE | Added 4 new modes:
	* Blockflip
	* Time Rush
	* Claustrophobia
	* Negative Shadow

### v1.4.0
* FEATURE | Added Survival mode.

### v1.3.3
* FIX | Removed 200L exploit which could be used to increase the grade without any effort.

### v1.3.2
* ADD | Added a tileset by [Sinewave](https://twitter.com/sinewaveslicer).

### v1.3.1
* FIX | Fixed crazy frame rate issue.

### v1.3.0
* FEATURE | You can now select your favourite tileset in preferences menu!

### v1.2.0
* FEATURE | Added 200 Lines mode.
* CHANGE | Modified the select mode menu.

### v1.1.2
* FIX | Fixed variable name collision.

### v1.1.1
* CHANGE | Now the game shows next piece during starting countdown.

### v1.1.0
* FEATURE | Added Time Atttack mode.

### v1.0.1
* CHANGE | Increased grade requirements.

### v1.0.0
* NOTE | Profiles from previous versions are incompatibile with current version.
* FEATURE | Mode name is now shown in the play.
* CHANGE | Basically rebalanced EVERYTHING in scoring system.
* CHANGE | Replaced grading system with new one.
* CHANGE | Reduced DAS in most modes.
* CHANGE | Profiles are now using a (kind of) namespace.
* FIX | Fixed issue with part of profile being not loaded properly.
* FIX | Fixed version number being drawn twice while being in profile menu.

### v0.7.4
* FIX | Fixed broken menu after loading pre-v.0.7.3 profile.

### v0.7.3
* FEATURE | The menu controls are now changeable.
* FIX | Fixed control scheme change not working.

### v0.7.2
* FIX | Changed Phantom mode's invisibility flag to `true`.

### v0.7.1
* CHANGE | Made DAS faster on Another.

### v0.7.0
* NOTE | The scoring system balance is now screwed up because of these changes.
* FEATURE | Added Another and Phantom modes.
* CHANGE | Hard is faster now.
* CHANGE | Reduced starting line delay on ALL modes.

### v0.6.3
* FIX | Removed the fake 0G exploit.

### v0.6.2
* FIX | Reduced ammounts of potential misdrops with resseting the softdrop.

### v0.6.1
* CHANGE | Separated mode select from main menu.
* CHANGE | Hidden cursor from game screen.
* FIX | Removed unused font.
* FIX | Preferences are now properly saved.
* FIX | Fixed weird behaviour when loading diffrent profiles.

### v0.6.0
* FEATURE | Configuration is now saved.
* CHANGE | Made FPS lock optional.
* CHANGE | Buffed Hyper mode.
* CHANGE | Made DAS faster.

### v0.5.6
* FIX | FPS display is now working again.
* FIX | FPS lock is now more accurate.
* FIX | Timer is now accurate again.

### v0.5.5
* FIX | Fixed the FPS lock...
* BUG | But broke the fps display in the process.

### v0.5.4
* FEATURE | Added level bar, just like in Nullpomino.
* FIX | Limited the framerate for monitors which have over 60Hz.

### v0.5.3
* CHANGE | Added way more grades.

### v0.5.2
* FIX | Fixed the IRS behaviour.

### v0.5.1
* NOTE | Yes, this is basically an improvement pack that would have been done in v0.5.0, but the bug with scoring forced me to push the update early. \*sigh\*
* FEATURE | FPS meter can be turned off.
* CHANGE | Moved player data to the bottom part of the screen.

### v0.5.0
* FEATURE | Added FPS counter.
* FEATURE | Added a possibility to flip the roation buttons.
* CHANGE | Fixed Hyper mode scoring.
* CHANGE | Current profile's name and grade are now shown nearly everywhere.
* CHANGE | Modified grade colors.

### v0.4.3
* CHANGE | Completely changed list of grades.
* CHANGE | Nerfed Hard mode.
* CHANGE | Buffed Hyper mode.

### v0.4.2
* FIX | Fixed issue with grade reverting to unranked.
* FIX | Profile menu is NOW resseting properly... I hope.

### v0.4.1
* FIX | Profile menu is now resseting properly.

### v0.4.0
* FEATURE | Added Hyper mode.
* FEATURE | Added third rotation button.
* FEATURE | Created local profile system.
* CHANGE | Renamed difficulties.
* FIX | Cleaned up some code, making creating additional modes easier.
* FIX | Fixed score gain mechanism.

### v0.3.0
* FEATURE | Added Classic|Easy.
* FEATURE | Added countdown before start.
* FEATURE | Added a timer.
* CHANGE | Limited ammount of floorkicks per piece to 2.
* CHANGE | Rearranged the file structure.
* FIX | ARE is now more true.
* FIX | Fixed badly scoped variables, which were potentially problematic.
* FIX | Fixed one variable that caused problems with expanding code.

### v0.2.1
* FIX | Fixed the bug where a piece could lock during ARE.
* FIX | IRS (pre-rotation) now works consistently.
* FIX | Fixed a typo in variable declaration, which often caused freezes.

### v0.2.0
* FEATURE | Added ghost piece.
* FEATURE | Added Classic|Hard
* FEATURE | Added MODE CLEAR message.
* CHANGE | Slighty changed low-speed scoring.
* CHANGE | Refactored `inputNormal()` to allow easier difficulty definitions.
* CHANGE | Moved variable declarations out of variables.js.
* CHANGE | Another modification of Classic|Normal scoring.

### v0.1.0
* NOTE | First beta release!
* FEATURE | Added line clear animation.
 CHANGE | Expanded difficulty definition system.
* FIX | Now the Classic|Normal properly ends at Level 1000.
* FIX | Fixed the speed curve of Classic|Normal.
* FIX | Fixed the lock piece mechanic.

### v0.0.6
* FEATURE | Added bufferable rotation.
* FEATURE | Added suicide button.
* CHANGE | Modified scoring and added a debug toogle for it.

### v0.0.5
* CHANGE | [Xershh](http://steamcommunity.com/id/xershh/) made me a tileset, so now you have a much better graphics!

### v0.0.4a
* FIX | Levels 500+ are now playable.
* FIX | Fixed minor redraw bug in controls menu.

### v0.0.4
* FEATURE | Added control scheme editor.
* CHANGE | Scaled line clear score upwards so it will be more relevant compared to time.
* FIX | Fixed potential weird behaviour with scoring system.

### v0.0.3
* CHANGE | Allowed more wallkicks and confirmed that wallkick priority works as it should.
* CHANGE | Lowered I-mino spawn location by one tile.

### v0.0.2
* CHANGE | Slighty modified scoring system.
* FIX | Bugfixes.

### v0.0.1a
* FIX | Bugfixes.

### v0.0.1
* FIX | First alpha release.
