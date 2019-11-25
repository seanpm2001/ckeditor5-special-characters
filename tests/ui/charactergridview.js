/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import CharacterGridView from '../../src/ui/charactergridview';
import ViewCollection from '@ckeditor/ckeditor5-ui/src/viewcollection';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import testUtils from '@ckeditor/ckeditor5-core/tests/_utils/utils';

describe( 'CharacterGridView', () => {
	let view;

	testUtils.createSinonSandbox();

	beforeEach( () => {
		view = new CharacterGridView();
		view.render();
	} );

	afterEach( () => {
		view.destroy();
	} );

	describe( 'constructor()', () => {
		it( 'creates view#tiles collection', () => {
			expect( view.tiles ).to.be.instanceOf( ViewCollection );
		} );

		it( 'creates #element from template', () => {
			expect( view.element.classList.contains( 'ck' ) ).to.be.true;
			expect( view.element.classList.contains( 'ck-character-grid' ) ).to.be.true;
			expect( view.element.style.gridTemplateColumns ).to.equal( '' );
		} );

		it( 'supports columns configuration', () => {
			const view = new CharacterGridView( {}, { columns: 3 } );
			view.render();

			expect( view.element.style.gridTemplateColumns ).to.be.oneOf( [ '1fr 1fr 1fr', 'repeat(3, 1fr)' ] );

			view.destroy();
		} );
	} );

	describe( 'createTile()', () => {
		it( 'creates a new tile button', () => {
			const tile = view.createTile( 'ε', 'foo bar baz' );

			expect( tile ).to.be.instanceOf( ButtonView );
			expect( tile.label ).to.equal( 'ε' );
			expect( tile.withText ).to.be.true;
			expect( tile.class ).to.equal( 'ck-character-grid__tile' );
		} );

		it( 'delegates #execute from the tile to the grid', () => {
			const tile = view.createTile( 'ε', 'foo bar baz' );
			const spy = sinon.spy();

			view.on( 'execute', spy );
			tile.fire( 'execute' );

			sinon.assert.calledOnce( spy );
			sinon.assert.calledWithExactly( spy, sinon.match.any, { name: 'foo bar baz' } );
		} );
	} );
} );
