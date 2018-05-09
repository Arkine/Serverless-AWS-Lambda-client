import { Storage } from 'aws-amplify';

export async function s3Upload(file) {
    const filename = `${Date.now()}-${file.name}`; // Not the best way to do this...

    // If we are storing publicly, omit the .vault
    const stored = await Storage.vault.put(filename, file, {
        contentType: file.type
    });

    return stored.key;
}