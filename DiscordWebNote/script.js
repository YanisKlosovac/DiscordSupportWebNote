document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('noteForm');
    const noteContent = document.getElementById('noteContent');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');

    let selectedRating = 0;

    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            selectedRating = this.value;
        });
    });

    noteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const note = noteContent.value.trim();
        if (note !== '') {
            sauvegarderNote(note, selectedRating);
            noteContent.value = '';
            selectedRating = 0;
            ratingInputs.forEach(input => {
                input.checked = false;
            });
        } else {
            alert('Veuillez saisir du contenu pour la note.');
        }
    });
});

function sauvegarderNote() {
    const supportName = document.getElementById('supportName').value;
    const noteContent = document.getElementById('noteContent').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    const embed = {
        title: "Nouvelle Note",
        color: 0xff0000, 
        fields: [
            {
                name: "Nom du support",
                value: supportName
            },
            {
                name: "Note",
                value: "⭐".repeat(rating)
            },
            {
                name: "Contenu de la note",
                value: noteContent
            }
        ]
    };

    const webhookURL = 'Votre_WebBook_Discord';
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ embeds: [embed] }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi de la note au salon Discord.');
        }
        alert('Note sauvegardée avec succès.');
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur s\'est produite lors de la sauvegarde de la note.');
    });
}

