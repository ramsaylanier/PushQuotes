Feature: Remove A Deck and All of It's Quotes

	As an author
	I want remove a deck
	So that I can remove old decks

	Background:
		Given I am logged in

	@dev
	Scenario: Delete a deck
	Given I have created a deck
	When I click the delete button
	Then the deck and its quotes should be removed from the database



