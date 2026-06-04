#include <stdio.h>

// Desafio Super Trunfo.
int main(){
    // Declaração de variáveis.
    char estado01, estado02;
    char codigo_carta01[4], codigo_carta02[4];
    char nome_cidade01[20], nome_cidade02[20];
    int populacao01, populacao02;
    int pontos_turisticos01, pontos_turisticos02;
    float area01, area02, densidade_populacional01, densidade_populacional02;
    float pib01, pib02, pib_per_capta01, pib_per_capta02;
    int atributo1, atributo2, resultado1, resultado2;
    char empate1, empate2;

    // Entrada de dados da cidade 1.
    printf("===== DADOS DA PRIMEIRA CIDADE =====\n");
    printf("Informe o código do estado 1: ");
    scanf(" %c", &estado01);
    
    while((getchar()) != '\n');

    printf("Informe o código da carta 1: ");
    scanf("%s", &codigo_carta01);
    
    printf("Informe o nome da cidade 1: ");
    scanf("%s", &nome_cidade01);

    printf("Informe a população da cidade 1: ");
    scanf("%d", &populacao01);

    printf("Informe quantos pontos turísticos tem a cidade 1: ");
    scanf("%d", &pontos_turisticos01);

    printf("Informe a área urbana da cidade 1: ");
    scanf("%f", &area01);

    printf("Informe o PIB da cidade 1: ");
    scanf("%f", &pib01);

    // Processamento dos dados da cidade 1.
    densidade_populacional01 = populacao01 / area01;
    pib_per_capta01 = pib01 / populacao01;
    
    // Entrada de dados da cidade 2.
    printf("\n===== DADOS DA SEGUNDA CIDADE =====\n");
    printf("Informe o código do estado 2: ");
    scanf(" %c", &estado02);

    while((getchar()) != '\n');

    printf("Informe o código da carta 2: ");
    scanf("%s", &codigo_carta02);

    printf("Informe o nome da cidade 2: ");
    scanf("%s", &nome_cidade02);

    printf("Informe a população da cidade 2: ");
    scanf("%d", &populacao02);

    printf("Informe quantos pontos turísticos tem a cidade 2: ");
    scanf("%d", &pontos_turisticos02);

    printf("Informe a área urbana da cidade 2: ");
    scanf("%f", &area02);

    printf("Informe o PIB da cidade 2: ");
    scanf("%f", &pib02);

    // Processamento dos dados da cidade 2.
    densidade_populacional02 = populacao02 / area02;
    pib_per_capta02 = pib02 / populacao02;

    // Menu interativo.
        printf("\n====== FAÇAM SUAS APOSTAS ======\n");
        printf("Escolha dois dos atributos abaixo:\n");
        printf("1. População\n");
        printf("2. Área urbana\n");
        printf("3. PIB\n");
        printf("4. Pontos turísticos\n");
        printf("5. Densidade populacional\n");

        printf("\nInforme o primeiro atributo: ");
        scanf("%d", &atributo1);

        printf("Informe o segundo atributo: ");
        scanf("%d", &atributo2);

        if(atributo1 == atributo2){
            printf("Opção inválida, você deve escolher atributos diferentes!\n");
            return 0;
        }

        if(atributo1 < 1 || atributo1 > 5 || atributo2 < 1 || atributo2 > 5){
            printf("Opção inválida! Você deve informar números entre 1 e 5.\n");
            return 0;
        }

        // Processamento dos atributos.
        printf("\n ====== DISPUTA DO PRIMEIRO ATRIBUTO ======\n");

        switch (atributo1) {
            case 1:
                printf("Você escolheu população.\n");
                resultado1 = (populacao01 > populacao02) ? 1 : 0;
                if (populacao01 == populacao02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com uma população de %d habitantes.\n", nome_cidade01, nome_cidade02, populacao01);
                    empate1 = 'E';
                } else if (resultado1 == 1) {
                    printf("Neste atributo a cidade de %s, com uma população de %d habitantes venceu a cidade de %s, com uma população de %d habitantes.\n", nome_cidade01, populacao01, nome_cidade02, populacao02);
                } else {
                    printf("Neste atributo a cidade de %s, com uma população de %d habitantes venceu a cidade de %s, com uma população de %d habitantes.\n", nome_cidade02, populacao02, nome_cidade01, populacao01);
                }
                break;
    
            case 2:
                printf("Você escolheu área urbana.\n");
                resultado1 = (area01 > area02) ? 1 : 0;
                if (area01 == area02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com uma área urbana de %.2f km².\n", nome_cidade01, nome_cidade02, area01);
                    empate1 = 'E';
                } else if (resultado1 == 1) {
                    printf("Neste atributo a cidade de %s, com uma área urbana de %.2f km² venceu a cidade de %s, com uma área urbana de %.2f km².\n", nome_cidade01, area01, nome_cidade02, area02);
                } else {
                    printf("Neste atributo a cidade de %s, com uma área urbana de %.2f km² venceu a cidade de %s, com uma área urbana de %.2f km².\n", nome_cidade02, area02, nome_cidade01, area01);
                }
                break;
    
            case 3:
                printf("Você escolheu PIB.\n");
                resultado1 = (pib01 > pib02) ? 1 : 0;
                if (pib01 == pib02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com um PIB de %.2f.\n", nome_cidade01, nome_cidade02, pib01);
                    empate1 = 'E';
                } else if (resultado1 == 1) {
                    printf("Neste atributo a cidade de %s, com um PIB de %.2f venceu a cidade de %s, com um PIB de %.2f.\n", nome_cidade01, pib01, nome_cidade02, pib02);
                } else {
                    printf("Neste atributo a cidade de %s, com um PIB de %.2f venceu a cidade de %s, com um PIB de %.2f.\n", nome_cidade02, pib02, nome_cidade01, pib01);
                }
                break;
    
            case 4:
                printf("Você escolheu pontos turísticos.\n");
                resultado1 = (pontos_turisticos01 > pontos_turisticos02) ? 1 : 0;
                if (pontos_turisticos01 == pontos_turisticos02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com %d pontos turísticos.\n", nome_cidade01, nome_cidade02, pontos_turisticos01);
                    empate1 = 'E';
                } else if (resultado1 == 1) {
                    printf("Neste atributo a cidade de %s, com %d pontos turísticos venceu a cidade de %s, com %d pontos turísticos.\n", nome_cidade01, pontos_turisticos01, nome_cidade02, pontos_turisticos02);
                } else {
                    printf("Neste atributo a cidade de %s, com %d pontos turísticos venceu a cidade de %s, com %d pontos turísticos.\n", nome_cidade02, pontos_turisticos02, nome_cidade01, pontos_turisticos01);
                }
                break;
    
            case 5:
                printf("Você escolheu densidade demográfica.\n");
                resultado1 = (densidade_populacional01 < densidade_populacional02) ? 1 : 0;
                if (densidade_populacional01 == densidade_populacional02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com %.2f habitantes p/ km².\n", nome_cidade01, nome_cidade02, densidade_populacional01);
                    empate1 = 'E';
                } else if (resultado1 == 1) {
                    printf("Neste atributo a cidade de %s, com %.2f habitantes p/ km² venceu a cidade de %s, com %.2f habitantes p/ km².\n", nome_cidade01, densidade_populacional01, nome_cidade02, densidade_populacional02);
                } else {
                    printf("Neste atributo a cidade de %s, com %.2f habitantes p/ km² venceu a cidade de %s, com %.2f habitantes p/ km².\n", nome_cidade02, densidade_populacional02, nome_cidade01, densidade_populacional01);
                }
                break;
    
            default:
                printf("Opção inválida.\n");
        }
        
        printf("\n ====== DISPUTA DO SEGUNDO ATRIBUTO ======\n");

        switch (atributo2) {
            case 1:
                printf("Você escolheu população.\n");
                resultado2 = (populacao01 > populacao02) ? 1 : 0;
                if (populacao01 == populacao02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com uma população de %d habitantes.\n", nome_cidade01, nome_cidade02, populacao01);
                    empate2 = 'E';
                } else if (resultado2 == 1) {
                    printf("Neste atributo a cidade de %s, com uma população de %d habitantes venceu a cidade de %s, com uma população de %d habitantes.\n", nome_cidade01, populacao01, nome_cidade02, populacao02);
                } else {
                    printf("Neste atributo a cidade de %s, com uma população de %d habitantes venceu a cidade de %s, com uma população de %d habitantes.\n", nome_cidade02, populacao02, nome_cidade01, populacao01);
                }
                break;
    
            case 2:
                printf("Você escolheu área urbana.\n");
                resultado2 = (area01 > area02) ? 1 : 0;
                if (area01 == area02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com uma área urbana de %.2f km².\n", nome_cidade01, nome_cidade02, area01);
                    empate2 = 'E';
                } else if (resultado2 == 1) {
                    printf("Neste atributo a cidade de %s, com uma área urbana de %.2f km² venceu a cidade de %s, com uma área urbana de %.2f km².\n", nome_cidade01, area01, nome_cidade02, area02);
                } else {
                    printf("Neste atributo a cidade de %s, com uma área urbana de %.2f km² venceu a cidade de %s, com uma área urbana de %.2f km².\n", nome_cidade02, area02, nome_cidade01, area01);
                }
                break;
    
            case 3:
                printf("Você escolheu PIB.\n");
                resultado2 = (pib01 > pib02) ? 1 : 0;
                if (pib01 == pib02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com um PIB de %.2f.\n", nome_cidade01, nome_cidade02, pib01);
                    empate2 = 'E';
                } else if (resultado2 == 1) {
                    printf("Neste atributo a cidade de %s, com um PIB de %.2f venceu a cidade de %s, com um PIB de %.2f.\n", nome_cidade01, pib01, nome_cidade02, pib02);
                } else {
                    printf("Neste atributo a cidade de %s, com um PIB de %.2f venceu a cidade de %s, com um PIB de %.2f.\n", nome_cidade02, pib02, nome_cidade01, pib01);
                }
                break;
    
            case 4:
                printf("Você escolheu pontos turísticos.\n");
                resultado2 = (pontos_turisticos01 > pontos_turisticos02) ? 1 : 0;
                if (pontos_turisticos01 == pontos_turisticos02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com %d pontos turísticos.\n", nome_cidade01, nome_cidade02, pontos_turisticos01);
                    empate2 = 'E';
                } else if (resultado2 == 1) {
                    printf("Neste atributo a cidade de %s, com %d pontos turísticos venceu a cidade de %s, com %d pontos turísticos.\n", nome_cidade01, pontos_turisticos01, nome_cidade02, pontos_turisticos02);
                } else {
                    printf("Neste atributo a cidade de %s, com %d pontos turísticos venceu a cidade de %s, com %d pontos turísticos.\n", nome_cidade02, pontos_turisticos02, nome_cidade01, pontos_turisticos01);
                }
                break;
    
            case 5:
                printf("Você escolheu densidade demográfica.\n");
                resultado2 = (densidade_populacional01 < densidade_populacional02) ? 1 : 0;
                if (densidade_populacional01 == densidade_populacional02) {
                    printf("Neste atributo houve empate entre as cidades de %s e %s, ambas com %.2f habitantes p/ km².\n", nome_cidade01, nome_cidade02, densidade_populacional01);
                    empate2 = 'E';
                } else if (resultado2 == 1) {
                    printf("Neste atributo a cidade de %s, com %.2f habitantes p/ km² venceu a cidade de %s, com %.2f habitantes p/ km².\n", nome_cidade01, densidade_populacional01, nome_cidade02, densidade_populacional02);
                } else {
                    printf("Neste atributo a cidade de %s, com %.2f habitantes p/ km² venceu a cidade de %s, com %.2f habitantes p/ km².\n", nome_cidade02, densidade_populacional02, nome_cidade01, densidade_populacional01);
                }
                break;
                    
            default:
                printf("Opção inválida.\n");
        }


    // Apuração do vencedor.
    printf("\n===== GRANDE VENCEDOR =====\n");
    if((resultado1 == 1 && resultado2 == 1) || 
        (resultado1 == 1 && empate2 == 'E') || 
        (resultado2 == 1 && empate1 == 'E')){
        printf("A cidade de %s venceu!\n", nome_cidade01);
    }else if((resultado1 == 0 && resultado2 == 0) || 
        (resultado1 == 0 && empate2 == 'E') || 
        (resultado2 == 0 && empate1 == 'E')){
        printf("A cidade de %s venceu!\n", nome_cidade02);
    }else{
        printf("Houve empate!\n");
    }
    
    return 0;
}