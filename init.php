<?php
\Larakit\StaticFiles\Manager::package('larakit/sf-larakit-js')
                            ->setSourceDir('public')
                            ->usePackage('larakit/sf-jquery')
                            ->jsPackage('js/larakit.js');