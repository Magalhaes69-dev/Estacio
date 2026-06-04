#include <stdio.h>

int main(){
    char cabecalho[10] = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'};

    int tabuleiro[10][10];

    int linha, coluna;

    // Inicializa todas as posições do tabuleiro com 0.
    for(linha = 0; linha < 10; linha++){
        for(coluna = 0; coluna < 10; coluna++){
            tabuleiro[linha] [coluna] = 0;
        }
    }

    // Posiciona o navio horizontal.
    tabuleiro[1][1] = 3;
    tabuleiro[1][2] = 3;
    tabuleiro[1][3] = 3;

    // Posiciona o navio diagonal/direita.
    int linha_inicio_dd = 2;
    int coluna_inicio_dd = 5;
    int tamanho_navio_dd = 3;

    for(int i = 0; i < tamanho_navio_dd; i++){
        tabuleiro[linha_inicio_dd - i][coluna_inicio_dd + i] = 3;
    }

    // Posiciona o navio diagonal/esquerda.
    int linha_inicio_de = 8;
    int coluna_inicio_de =2;
    int tamanho_navio_de = 3;

    for(int i = 0; i < tamanho_navio_de; i++){
        tabuleiro[linha_inicio_de - i][coluna_inicio_de - i] = 3;
    }
    
    // Posiciona o navio vertical.
    tabuleiro[6][8] = 3;
    tabuleiro[7][8] = 3;
    tabuleiro[8][8] = 3;

    // Insere o cone.
    int linha_origem_cone = 3;
    int coluna_origem_cone = 7;

    for(linha = 0; linha < 10; linha++){
        for(coluna = 0; coluna < 10; coluna++){

            int linha_cone = linha - linha_origem_cone;
            int coluna_cone = coluna - coluna_origem_cone;

            if(linha_cone == 0){
                if(coluna_cone >= -1 && coluna_cone <= 1){
                    tabuleiro[linha][coluna] = 5;
                }            
            }
            else if(linha_cone == 1){
                if(coluna_cone >= -2 && coluna_cone <= 2){
                    tabuleiro[linha][coluna] = 5;
                }
            }
            else if(linha_cone == -1){
                if(coluna_cone == 0){
                    tabuleiro[linha][coluna] = 5;
                }
            }
        }
    }

    // Insere octaedro.
    int linha_origem_octa = 3;
    int coluna_origem_octa = 1;

    for(linha = 0; linha < 10; linha++){
        for(coluna = 0; coluna < 10; coluna++){

            int octa_linha = linha - linha_origem_octa;
            int octa_coluna = coluna - coluna_origem_octa;

            if(octa_linha == 0){
                if(octa_coluna >= -1 && octa_coluna <= 1){
                    tabuleiro[linha][coluna] = 5;
                }            
            }
            else if(octa_coluna == 0){
                if(octa_linha >= -1 && octa_linha <= 1){
                    tabuleiro[linha][coluna] = 5;
                }
            }
        }
    }

    // Insere cruz.
    int linha_origem_cruz = 6;
    int coluna_origem_cruz = 4;

    for(linha = 0; linha < 10; linha++){
        for(coluna = 0; coluna < 10; coluna++){

            int cruz_linha = linha - linha_origem_cruz;
            int cruz_coluna = coluna - coluna_origem_cruz;

            if(cruz_linha == 0){
                if(cruz_coluna >= -2 && cruz_coluna <= 2){
                    tabuleiro[linha][coluna] = 5;
                }
            }
            else if(cruz_coluna == 0){
                if(cruz_linha >= -1 && cruz_linha <= 1){
                    tabuleiro[linha][coluna] = 5;
                }
            }
        }
    }

    // Imprime cabeçalho das colunas ('A' a 'J').
    printf("   ");
    for(coluna = 0; coluna < 10; coluna++){
        printf(" %c", cabecalho[coluna]);
    }
    printf("\n");

    // Imprime o índice (1 a 10) e o conteúdo (0, 3 ou 5) das linhas.
    for(linha = 0; linha < 10; linha++){
        printf("%2d ", linha + 1);

        for(coluna = 0; coluna < 10; coluna++){
            printf(" %d", tabuleiro[linha][coluna]);
        }
        printf("\n");
    }

    return 0;
}
