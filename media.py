import csv

def calcular_media(nome_arquivo):
    with open(nome_arquivo, newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Pula o cabeçalho
        valores = [float(row[0]) for row in reader if row]
        if valores:
            return sum(valores) / len(valores)
        return 0

if __name__ == "__main__":
    nome_arquivo = 'dados.csv'
    media = calcular_media(nome_arquivo)
    print(media)
