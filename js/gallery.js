/**
 * ScreenShots Gallery
 */

import $ from 'jquery';
import { KEY_CODES } from './utils';

var $window = $(window);
var $imageSmall = $('.photogallery__image');
var $imageBig = $('.overlay-gallery-preview img');
var $imageSmallBox = $('.photogallery__image-box');
var $imageBigBox = $('.overlay-gallery__preview');
var $overlayGallery = $('.overlay-gallery');

var $closeGallery = $('.gallery__btn_close');
var $next = $('.overlay-gallery-control_right');
var $prev = $('.overlay-gallery-control_left');
var $moreScreenShots = $('.photogallery__btn');

var $currentBox = $('.preview-number_current');
var $totalBox = $('.preview-number_total');

var $ImageCount = $imageSmall.clone();
var currentStep = 1;

function totalImages() {
    $totalBox.text($ImageCount.length);
}

$moreScreenShots.on('click', function(event) {
    event.preventDefault();

    $(this).remove();
    
    $imageSmallBox
        .filter('.invisible')
        .removeClass('invisible');
    
    totalImages();
});

$imageSmallBox.on('click', function(event) {
    event.preventDefault();

    var $this = $(this);
    $overlayGallery.removeClass('invisible');
    
    currentStep = $this.attr('data-img');
    $currentBox.text(currentStep);
    totalImages();
    
    $this
        .children('img')
        .clone()
        .appendTo($imageBigBox)
        .siblings('img')
        .remove();
});

$next.on('click', function() {
    currentStep++;
    $currentBox.text(currentStep);
    totalImages();
    
    $imageSmall
        .filter($('[data-img = ' + currentStep + ']'))
        .clone().appendTo($imageBigBox)
        .siblings('img')
        .remove();
    
    if (currentStep >= $totalBox.text()) {
        currentStep = $totalBox.text();
        $currentBox.text(currentStep);
    }
});

$prev.on('click', function() {
    currentStep--;
    $currentBox.text(currentStep);
    totalImages();
    
    $imageSmall
        .filter($('[data-img = ' + currentStep + ']'))
        .clone().appendTo($imageBigBox)
        .siblings('img')
        .remove();
    
    if (currentStep <= 1) {
        currentStep = 1;
        $currentBox.text(currentStep);
    }
});

$window.keydown(function(event) {
    var $checkOverlay = $overlayGallery.not('invisible');

    if (event.keyCode == KEY_CODES.RIGHT && $checkOverlay) {
        currentStep++;
        $currentBox.text(currentStep);
        totalImages();
        
        $imageSmall
            .filter($('[data-img = ' + currentStep + ']'))
            .clone().appendTo($imageBigBox)
            .siblings('img')
            .remove();
        
        if (currentStep >= $totalBox.text()) {
            currentStep = $totalBox.text();
            $currentBox.text(currentStep);
        }
    }

    if (event.keyCode == KEY_CODES.LEFT && $checkOverlay) {
        currentStep--;
        $currentBox.text(currentStep);
        totalImages();
        
        $imageSmall
            .filter($('[data-img = ' + currentStep + ']'))
            .clone().appendTo($imageBigBox)
            .siblings('img')
            .remove();
        
        if (currentStep <= 1) {
            currentStep = 1;
            $currentBox.text(currentStep);
        }
    }

    if (event.keyCode == KEY_CODES.ESC && $checkOverlay) {
        $imageBig.remove().siblings('img').remove();
        $overlayGallery.addClass('invisible');
    }
});

$closeGallery.on('click', function(event) {
    event.preventDefault();
    
    $imageBig.remove().siblings('img').remove();
    $overlayGallery.addClass('invisible');
});
