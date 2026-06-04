// Desafio Xadrez.

#include <stdio.h>

// Recursiva para mover a torre para a direita.
void torreDireita(int casas){
    if(casas > 0){
        printf("Direita\n");
        torreDireita(casas - 1);
    }
}

// Recursiva para mover o bispo para cima e para direita.
void bispoDiagonalDireita(int vertical, int horizontal)
{
    for(int i = 0; i < vertical; i++){
        printf("Vertical-Cima\n");
    }
    for(int j = 0; j < horizontal; j++){
        printf("Horizontal-Direita\n");
    }
}

// Recursiva para mover a rainha para a esquerda.
void rainhaEsquerda(int casas){
    if(casas > 0){
        printf("Esquerda\n");
        rainhaEsquerda(casas - 1);
    }
}

int main(){
    
    printf("=== Movimento da torre ===\n");
    torreDireita(5);

    printf("\n=== Movimento do bispo ===\n");
    bispoDiagonalDireita(5, 5);

    printf("\n=== Movimento da rainha ===\n");
    rainhaEsquerda(8);
    
    printf("\n=== Movimento do cavalo ===\n");
    int casasCimaFeitas = 0;
    int casasDireitaFeitas = 0;
    int casasCima = 2;
    int casasDireita = 1;

    // Loop externo para controlar as fases do movimento.
    for(int fase = 1; fase <= (casasCima + casasDireita); fase++){
        if(casasCimaFeitas < casasCima){            
            // Loop interno para as casas verticais.
            for(int vertical = 0; vertical < 2; vertical++){
                printf("Cima\n");
                casasCimaFeitas++;
            }
            if(casasCimaFeitas < casasCima){
                continue;
            }
        }
        // Se já andou as casas para cima, tenta andar para a direita.
        if(casasCimaFeitas >= casasCima && casasDireitaFeitas < casasDireita){            
            // Loop interno para as casas horizontais.
            for(int horizontal = 0; horizontal < 1; horizontal++){
                printf("Direita\n");
                casasDireitaFeitas++;
            }
        }

        if(casasCimaFeitas >= casasCima && casasDireitaFeitas >= casasDireita){
            break;
        }
    }

    return 0;
}