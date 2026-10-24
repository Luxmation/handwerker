<?php
// Kopie als anfrage-config.php auf dem Server ablegen und ausfüllen. NICHT ins Git-Repo!
return [
    'empfaenger' => 'info@handwerker-blesius.de',
    'absender'   => 'info@handwerker-blesius.de',   // muss zum SMTP-Konto passen
    'smtp_host'  => 'smtp.strato.de',
    'smtp_port'  => 465,                             // 465 = SSL, 587 = STARTTLS
    'smtp_user'  => 'info@handwerker-blesius.de',
    'smtp_pass'  => 'HIER-PASSWORT-EINTRAGEN',
];
