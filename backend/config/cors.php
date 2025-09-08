<?php

return [
    'paths' => [
        'api/*',
    ],
    'allowed_methods'   => ['*'],
    'allowed_origins'   => [
        'http://dev.frontend.local'
    ],
    'allowed_origins_patterns' => [
        '/^http?:\/\/([a-z0-9-]+\.)?frontend\.local$/',
    ],
    'allowed_headers'   => ['*'],
    'exposed_headers'   => [],
    'max_age'           => 3600,
    'supports_credentials' => true,
];