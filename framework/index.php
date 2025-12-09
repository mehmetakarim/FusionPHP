<?php
// Hedef URL
$url = "https://kobidestek.kurumsalit.com/panel";

// URL içeriğini bir değişkene atar
$icerik = file_get_contents($url);

// İçeriği ekrana yazdırır
if ($icerik !== false) {
    echo $icerik;
} else {
    echo "Veri çekilemedi.";
}
?>